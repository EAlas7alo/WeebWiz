import React, { useState, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uuid from 'uuid/v4'
import styled from 'styled-components'
import { findVideosById } from '../../logic/youtubeApi'
import parseYoutubeUrl from '../../logic/youtubeUrlParser'
import { addVideo, editVideo } from '../../redux/videoEntryReducer'
import VideoSpecs from './VideoSpecs'
import QuizAnswersContainer from './QuizAnswersContainer'
import useEntry from '../hooks/useEntry'

const SearchContainer = styled.div`
  
`

const MainContainer = styled.div`
  display: flex
  align-items: center
  flex-direction: column
`

const QuestionContainer = styled.div`
  display: flex
  flex-direction: column
  align-items: center
  padding-bottom: 1em
`

const QuestionInput = styled.input`
  font-size: 20px
  padding: 0.5em
  width: 100%
  text-align: center
`

const AddVideoView = ({ addVideo, editVideo, setModalOpen, videoData, setVideoData }) => {
  const [linkField, setLinkField] = useState(videoData ? `https://www.youtube.com/watch?v=${videoData.videoId}` : '')
  const [linkFieldDisabled, setLinkFieldDisabled] = useState(!!videoData)
  const [isSubmitted, setIsSubmitted] = useState(!!videoData)
  const [videoMeta, setVideoMeta] = useState({ min: 0, max: 0 })
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
  }, dispatch } = useEntry(videoData)

  useEffect(() => {
    if (!linkFieldDisabled) {
      dispatch({
        type: 'add',
        start: 0,
        end: 0,
      })
    }
  }, [linkField])

  const handleSearchVideo = (event) => {
    setIsSubmitted(false)
    setLinkField(event.target.value)
    const id = parseYoutubeUrl(event.target.value)
    if (id === null) {
      event.preventDefault()
      setShowError(true)
    } else {
      setShowError(false)
      dispatch({
        type: 'add',
        field: 'videoId',
        value: id,
      })
      event.preventDefault()
      setIsSubmitted(true)
    }
  }

  const onReady = (event) => {
    setVideoMeta({ min: 0, max: event.target.getDuration() })
    // event.target.seekTo(startTime, true)
  }

  const handleSubmit = async () => {
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
      }
      if (videoData) {
        editVideo(newVideoEntry)
      } else {
        addVideo(newVideoEntry)
      }
      setVideoData(null)
    }
    setModalOpen(false)
  }

  const handleResetVideo = () => {
    setIsSubmitted(false)
    setLinkField('')
    setLinkFieldDisabled(false)
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
      <SearchContainer>
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
      </SearchContainer>
      {showError && (
        <div>
          There was an error with your YouTube link.
        </div>
      )}
      {isSubmitted && (
        <div>
          <QuestionContainer>
            <h4>Question</h4>
            <QuestionInput
              type="text"
              value={entryTitle}
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
          <QuizAnswersContainer answers={answers} dispatch={dispatch} />
          <div>
            <button type="button" onClick={handleSubmit}>Submit</button>
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
  setVideoData: PropTypes.func.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  videoData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    videoId: PropTypes.string.isRequired,
    entryTitle: PropTypes.string.isRequired,
  }),
}

export default connect(mapStateToProps, mapDispatchToProps)(AddVideoView)
