import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Youtube from 'react-youtube'
import uuid from 'uuid/v4'
import styled from 'styled-components'
import { findVideosById } from '../../logic/youtubeApi'
import parseYoutubeUrl from '../../logic/youtubeUrlParser'
import VideoLengthSliderContainer from './VideoLengthSliderContainer'
import { addVideo } from '../../redux/videoEntryReducer'

const SearchContainer = styled.div`
  flex-direction: column
`

const AddVideoView = ({ addVideo, setModalOpen, videoData }) => {
  // Set state values if editing an existing entry
  const [linkField, setLinkField] = useState(videoData ? `https://www.youtube.com/watch?v=${videoData.videoId}` : '')
  const [videoId, setVideoId] = useState(videoData ? videoData.videoId : '')
  const [isSubmitted, setIsSubmitted] = useState(videoData ? true : false)
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
    setPlayerOptions(playerOptions => {
      return { ...playerOptions,
        playerVars: { ...playerOptions.playerVars,
          start: runTime.start,
          end: runTime.end,
        },
      }
    })
  }, [runTime])

  const handleSearchVideo = (event) => {
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

  const onStateChange = (event) => {
    console.log(event.target)
  }

  const handleSubmit = async () => {
    if (isSubmitted && !videoData) {
      const { result: { items } } = await findVideosById([videoId])
      console.log(items)
      const newVideoEntry = {
        title: items[0].snippet.title,
        id: uuid(),
        videoId,
        start: runTime.start,
        end: runTime.end,
        thumbnail: items[0].snippet.thumbnails.default.url,
      }
      addVideo(newVideoEntry)
    } else if (isSubmitted && !videoData) {
      
    }
    setModalOpen(false)
  }

  return (
    <div>
      <SearchContainer>
        <div>Paste your Youtube link</div>
        <input type="text" value={linkField} onChange={handleSearchVideo} />
      </SearchContainer>
      {showError && (
        <div>
          There was an error with your YouTube link.
        </div>
      )}
      {isSubmitted && (
        <div>
          <Youtube
            videoId={videoId}
            opts={playerOptions}
            onReady={onReady}
            onStateChange={onStateChange}
          />
          <VideoLengthSliderContainer
            videoMeta={videoMeta}
            runTime={runTime}
            setRunTime={setRunTime}
          />
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
  setModalOpen: PropTypes.func.isRequired,
  videoData: PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    videoId: PropTypes.string.isRequired,
  }),
}

export default connect(mapStateToProps, mapDispatchToProps)(AddVideoView)
