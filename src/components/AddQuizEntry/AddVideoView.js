import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Youtube from 'react-youtube'
import parseYoutubeUrl from '../../logic/youtubeUrlParser'
import VideoLengthSliderContainer from './VideoLengthSliderContainer'
import { addVideo } from '../../redux/videoEntryReducer'

/*
  TODOS
  Video input field sanitization
*/

const AddVideoView = ({ addVideo }) => {
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

  const handleSearchVideo = (event) => {
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

  const handleSubmit = () => {
    if (isSubmitted) {
      const newVideoEntry = {
        videoId: videoUrl,
        start: runTime.start,
        end: runTime.end,
      }
      addVideo(newVideoEntry)
    }
  }

  return (
    <div>
      <form onSubmit={handleSearchVideo}>
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

AddVideoView.propTypes = {
  addVideo: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddVideoView)
