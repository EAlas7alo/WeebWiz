import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uuid from 'uuid/v4'
import styled from 'styled-components'
import { findVideosById } from '../../logic/youtubeApi'
import parseYoutubeUrl from '../../logic/youtubeUrlParser'
import { addVideo, editVideo } from '../../redux/videoEntryReducer'
import VideoSpecs from './VideoSpecs'
import QuizAnswersContainer from './QuizAnswersContainer'

const SearchContainer = styled.div`
  flex-direction: column
`

const AddVideoView = ({ addVideo, editVideo, setModalOpen, videoData, setVideoData }) => {
  const [linkField, setLinkField] = useState(videoData ? `https://www.youtube.com/watch?v=${videoData.videoId}` : '')
  const [linkFieldDisabled, setLinkFieldDisabled] = useState(!!videoData)
  const [videoId, setVideoId] = useState(videoData ? videoData.videoId : '')
  const [entryTitle, setEntryTitle] = useState(videoData ? videoData.entryTitle : '')
  const [isSubmitted, setIsSubmitted] = useState(!!videoData)
  const [videoMeta, setVideoMeta] = useState({ min: 0, max: 0 })
  const [runTime, setRunTime] = useState({
    start: videoData ? videoData.start : 0,
    end: videoData ? videoData.end : 0 })
  const [showError, setShowError] = useState(false)
  const [playerOptions, setPlayerOptions] = useState({
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  })

  useEffect(() => {
    if (!linkFieldDisabled) {
      setRunTime({ start: 0, end: 0 })
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
      setVideoId(id)
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
        start: runTime.start,
        end: runTime.end,
        thumbnail: items[0].snippet.thumbnails.default.url,
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
    setEntryTitle(value)
  }
  /*
  const formik = useFormik({
    initialValues: {
      videoId: videoData ? videoData.videoId : '',
      entryTitle: videoData ? videoData.entryTitle : '',
      runTime: {
        start: videoData ? videoData.start : 0,
        end: videoData ? videoData.end : 0,
      },
      onSubmit: handleSubmit,
    },
  }) */

  useEffect(() => {
    setPlayerOptions(playerOptions => {
      return { ...playerOptions,
        playerVars: { ...playerOptions.playerVars,
          start: runTime.start,
          end: runTime.end,
        },
      }
    })
  }, [runTime])

  return (
    <div>
      <SearchContainer>
        <div>Paste your Youtube link</div>
        <div>
          <input type="text" value={linkField} onChange={handleSearchVideo} disabled={linkFieldDisabled ? 'disabled' : ''} />
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
          <h3>Title</h3>
          <input type="text" value={entryTitle} onChange={({ target }) => handleEntryTitleChange(target.value)} />
          <VideoSpecs
            videoId={videoId}
            playerOptions={playerOptions}
            onReady={onReady}
            videoMeta={videoMeta}
            runTime={runTime}
            setRunTime={setRunTime}
          />
          <QuizAnswersContainer id={videoData ? videoData.id : null} />
          <div>
            <button type="button" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      )}
    </div>
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
