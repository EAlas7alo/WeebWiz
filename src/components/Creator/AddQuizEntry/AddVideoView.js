import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uuid from 'uuid/v4'
import styled from 'styled-components'
import { findVideosById } from '../../../logic/youtubeApi'
import parseYoutubeUrl from '../../../logic/youtubeUrlParser'
import { addVideo, editVideo } from '../../../redux/videoEntryReducer'
import VideoSpecs from './YoutubeVideo/VideoSpecs'
import QuizAnswersContainer from './QuizAnswersContainer'
import useEntry from '../../hooks/useEntry'

const SearchContainer = styled.div`
  margin-left: ${props => props.isSubmitted}
`

const MainContainer = styled.div`
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  margin-right: auto
`

const QuestionContainer = styled.div`
  display: flex
  flex-direction: column
  align-items: center
  padding-bottom: 1em
`

const QuestionInput = styled.input`
  font-size: 35px
  padding: 0.5em
  width: fit-content
  text-align: center
  
`

const VideoContainer = styled.div`
  display: flex
  flex-direction: column
  align-items: center
`

const AddVideoView = ({ addVideo, editVideo, videoData }) => {
  const [linkField, setLinkField] = useState(videoData ? `https://www.youtube.com/watch?v=${videoData.videoId}` : '')
  const [linkFieldDisabled, setLinkFieldDisabled] = useState(!!videoData && videoData.videoId !== '')
  const [isSubmitted, setIsSubmitted] = useState(!!videoData && videoData.videoId !== '')
  const [showError, setShowError] = useState(false)
  const [playerOptions, setPlayerOptions] = useState({
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  })

  const { state: {
    answers,
    videoId,
    entryTitle,
    start,
    end,
    videoMeta,
  }, dispatch } = useEntry(videoData)

  useEffect(() => {
    dispatch({
      type: 'set_entry',
      entry: videoData,
    })
    setIsSubmitted(videoData.videoId !== '')
    setLinkFieldDisabled(videoData.videoId !== '')
    setLinkField(videoData.videoId !== '' ? `https://www.youtube.com/watch?v=${videoData.videoId}` : '')
  }, [videoData])

  useEffect(() => {
    if (!linkFieldDisabled) {
      dispatch({
        type: 'add',
        start: 0,
        end: 0,
      })
    }
  }, [linkField])

  const handleInitialSubmit = async () => {
    if (isSubmitted) {
      const { result: { items } } = await findVideosById([videoId])
      const newVideoEntry = {
        entryTitle,
        videoTitle: items[0].snippet.title,
        id: videoData ? videoData.id : uuid(),
        videoId,
        start,
        end,
        thumbnail: items[0].snippet.thumbnails.default.url,
        answers,
        videoMeta,
      }
      if (videoData) {
        editVideo(newVideoEntry)
      } else {
        addVideo(newVideoEntry)
      }
    }
  }

  const handleSearchVideo = (event) => {
    setIsSubmitted(false)
    setLinkField(event.target.value)
    const id = parseYoutubeUrl(event.target.value)
    event.preventDefault()
    if (id === null) {
      setShowError(true)
    } else {
      setShowError(false)
      dispatch({
        type: 'add',
        field: 'videoId',
        value: id,
      })
      handleInitialSubmit()
      setIsSubmitted(true)
      setLinkFieldDisabled(true)
    }
  }

  const onReady = (event) => {
    dispatch({
      type: 'add',
      field: 'videoMeta',
      value: {
        min: 0,
        max: event.target.getDuration(),
      },
    })
  }

  const handleResetVideo = () => {
    setIsSubmitted(false)
    setLinkField('')
    setLinkFieldDisabled(false)
    dispatch({
      field: 'videoMeta',
      value: {
        min: 0,
        max: 0,
      },
    })
    dispatch({
      type: 'add',
      field: 'start',
      value: 0,
    })
    dispatch({
      type: 'add',
      field: 'end',
      value: 0,
    })
  }

  const handleEntryTitleChange = (value) => {
    dispatch({
      type: 'add',
      field: 'entryTitle',
      value,
    })
  }

  useEffect(() => {
    setPlayerOptions(playerOptions => {
      return { ...playerOptions,
        playerVars: { ...playerOptions.playerVars,
          start,
          end,
        },
      }
    })
  }, [start, end])

  return (
    <MainContainer>
      <SearchContainer isSubmitted={isSubmitted ? '' : '25em'}>
        <div>Paste your Youtube link</div>
        <div>
          <input
            type="text"
            value={linkField}
            onChange={handleSearchVideo}
            disabled={linkFieldDisabled ? 'disabled' : ''}
            size={40}
          />
          <button type="button" onClick={handleResetVideo}>Reset video</button>
        </div>
        {showError && (
          <div>
            There was an error with your YouTube link.
          </div>
        )}
      </SearchContainer>
      {isSubmitted && (
        <div>
          <VideoContainer>
            <QuestionContainer>
              <h4>Question</h4>
              <QuestionInput
                type="text"
                value={entryTitle}
                size={50}
                onChange={({ target }) => handleEntryTitleChange(target.value)}
              />
            </QuestionContainer>
            <VideoSpecs
              videoId={videoId}
              playerOptions={playerOptions}
              onReady={onReady}
              videoMeta={videoMeta}
              runTime={{
                start,
                end,
              }}
              dispatch={dispatch}
            />
          </VideoContainer>
          <QuizAnswersContainer answers={answers} dispatch={dispatch} />
          <div>
            <button type="button" onClick={handleInitialSubmit}>Submit</button>
          </div>
        </div>
      )}
    </MainContainer>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    addVideo: video => {
      dispatch(addVideo(video))
    },
    editVideo: video => {
      dispatch(editVideo(video))
    },
  }
}

const mapStateToProps = state => {
  return {
    startTime: state.startTime,
    endTime: state.endTime,
  }
}

AddVideoView.defaultProps = {
  videoData: null,
}

AddVideoView.propTypes = {
  addVideo: PropTypes.func.isRequired,
  editVideo: PropTypes.func.isRequired,
  videoData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    videoId: PropTypes.string.isRequired,
    entryTitle: PropTypes.string.isRequired,
  }),
}

export default connect(mapStateToProps, mapDispatchToProps)(AddVideoView)
