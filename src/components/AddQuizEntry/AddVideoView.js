import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Youtube from 'react-youtube'
import VideoLengthSliderContainer from './VideoLengthSliderContainer'

/*
  TODOS
  Video input field sanitization
*/

const AddVideoView = ({ startTime, endTime }) => {
  const [videoUrl, setVideoUrl] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [videoMeta, setVideoMeta] = useState({ min: 0, max: 0 })

  const handleLinkFieldChange = (event) => {
    setVideoUrl(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitted(true)
  }

  const playerOptions = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  }

  const onReady = (event) => {
    setVideoMeta({ min: 0, max: event.target.getDuration() })
    // event.target.seekTo(startTime, true)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Video
        <input type="text" name="quizlink" value={videoUrl} onChange={handleLinkFieldChange} />
        <input type="submit" value="+" />
      </form>
      {isSubmitted && (
        <div>
          <Youtube
            videoId={videoUrl}
            opts={playerOptions}
            onReady={onReady}
          />
          <VideoLengthSliderContainer videoMeta={videoMeta} />
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    startTime: state.startTime,
    endTime: state.endTime,
  }
}

export default connect(mapStateToProps)(AddVideoView)
