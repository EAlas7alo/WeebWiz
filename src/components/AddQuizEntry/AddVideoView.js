import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Youtube from 'react-youtube'
import parseYoutubeUrl from '../../logic/youtubeUrlParser'
import VideoLengthSliderContainer from './VideoLengthSliderContainer'

/*
  TODOS
  Video input field sanitization
*/

const AddVideoView = (props) => {
  const [linkField, setLinkField] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [videoMeta, setVideoMeta] = useState({ min: 0, max: 0 })
  const [runTime, setRunTime] = useState({ start: 0, end: 0 })

  const [playerOptions, setPlayerOptions] = useState({
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  })
  console.log(playerOptions)
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

  const handleLinkFieldChange = (event) => {
    setLinkField(event.target.value)
  }

  const handleSubmit = (event) => {
    const id = parseYoutubeUrl(linkField)
    setVideoUrl(id)
    setLinkField('')
    event.preventDefault()
    setIsSubmitted(true)
  }

  const onReady = (event) => {
    setVideoMeta({ min: 0, max: event.target.getDuration() })
    // event.target.seekTo(startTime, true)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Video
        <input type="text" name="quizlink" value={linkField} onChange={handleLinkFieldChange} />
        <input type="submit" value="+" />
      </form>
      {isSubmitted && (
        <div>
          <Youtube
            videoId={videoUrl}
            opts={playerOptions}
            onReady={onReady}
          />
          <VideoLengthSliderContainer
            videoMeta={videoMeta}
            runTime={runTime}
            setRunTime={setRunTime}
          />
          <div>
            xd
          </div>
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
