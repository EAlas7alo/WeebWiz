import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uuid from 'uuid/v4'
import { toSeconds, parse } from 'iso8601-duration'
import styled from 'styled-components'
import defaultThumbnail from '../../../graphics/defaultthumbnail.png'
import { findVideosById } from '../../../logic/youtubeApi'
import parseYoutubeUrl from '../../../logic/youtubeUrlParser'
import { addVideo, editVideo } from '../../../redux/videoEntryReducer'
import VideoSpecs from './YoutubeVideo/VideoSpecs'
import QuizAnswersContainer from './QuizAnswersContainer'

const SearchContainer = styled.div`
  margin-left: ${props => props.isSubmitted}
`

const MainContainer = styled.div`
  display: flex
  flex : 1 1 auto
  width: 100%
  align-items: center
  justify-content: center
  flex-direction: column
  margin-right: 15px
  margin-left: 15px
  border: 1px solid red
`

const QuestionContainer = styled.div`
  display: flex
  flex-direction: column
  align-items: center
  padding-bottom: 1em
  width: 100%
`

const QuestionInput = styled.input`
  font-size: 35px
  padding: 0.5em
  width: fit-content
  text-align: center
  width: 80%
  flex: 1
`

const VideoContainer = styled.div`
  display: flex
  flex-direction: column
  align-items: center
  width: 100%
`

const AddVideoView = ({ editVideo, videoData }) => {
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

  const {
    answers,
    videoId,
    entryTitle,
    start,
    end,
  } = videoData

  useEffect(() => {
    setIsSubmitted(videoData.videoId !== '')
    setLinkFieldDisabled(videoData.videoId !== '')
    setLinkField(videoData.videoId !== '' ? `https://www.youtube.com/watch?v=${videoData.videoId}` : '')
  }, [videoData])

  useEffect(() => {
    if (!linkFieldDisabled) {
      editVideo({
        ...videoData,
        start: 0,
        end: 0,
      })
    }
  }, [linkField, linkFieldDisabled, videoData, editVideo])

  const handleInitialSubmit = async (id) => {
    const { result: { items } } = await findVideosById([id])
    const newVideoEntry = {
      entryTitle,
      videoTitle: items[0].snippet.title,
      id: videoData ? videoData.id : uuid(),
      videoId: id,
      start,
      end,
      thumbnail: items[0].snippet.thumbnails.default.url,
      answers,
      videoMeta: {
        min: 0,
        max: toSeconds(parse(items[0].contentDetails.duration)),
      },
    }
    editVideo(newVideoEntry)
  }

  const handleSearchVideo = (event) => {
    // setIsSubmitted(false)
    setLinkField(event.target.value)
    const id = parseYoutubeUrl(event.target.value)
    event.preventDefault()
    if (id === null) {
      setShowError(true)
    } else {
      setShowError(false)
      handleInitialSubmit(id)
      setIsSubmitted(true)
      setLinkFieldDisabled(true)
    }
  }

  const handleResetVideo = () => {
    // setIsSubmitted(false)
    // setLinkField('')
    // setLinkFieldDisabled(false)
    editVideo({
      ...videoData,
      videoMeta: {
        min: 0,
        max: 0,
      },
      videoId: '',
      start: 0,
      end: 0,
      thumbnail: defaultThumbnail,
    })
  }

  const handleEntryTitleChange = (value) => {
    editVideo({
      ...videoData,
      entryTitle: value,
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
      <SearchContainer isSubmitted={isSubmitted ? '' : ''}>
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
      <VideoContainer>
        <QuestionContainer>
          <QuestionInput
            type="text"
            placeholder="Type your question here"
            value={entryTitle}
            onChange={({ target }) => handleEntryTitleChange(target.value)}
          />
        </QuestionContainer>
        <VideoSpecs
          videoId={videoId}
          playerOptions={playerOptions}
          videoData={videoData}
          runTime={{
            start,
            end,
          }}
        />
      </VideoContainer>
      <QuizAnswersContainer answers={answers} />
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
  const { videoEntryReducer: { quizList, currentQuizId, currentVideoId } } = state
  const quiz = quizList.find(quiz => quiz.id === currentQuizId)
  return {
    videoData: quiz.videoList.find(
      video => video.id === currentVideoId,
    ),
  }
}

AddVideoView.propTypes = {
  editVideo: PropTypes.func.isRequired,
  videoData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.object),
    videoMeta: PropTypes.shape({
      min: PropTypes.number.isRequired,
      max: PropTypes.number.isRequired,
    }).isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    videoId: PropTypes.string.isRequired,
    entryTitle: PropTypes.string.isRequired,
  }).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddVideoView)
