import React from 'react'
import PropTypes from 'prop-types'
import Youtube from 'react-youtube'
import VideoLengthSliderContainer from './VideoLengthSliderContainer'

function VideoSpecs({ videoId, playerOptions, onReady, videoMeta, runTime, setRunTime }) {

  return (
    <div>
      <Youtube
        videoId={videoId}
        opts={playerOptions}
        onReady={onReady}
      />
      <VideoLengthSliderContainer
        videoMeta={videoMeta}
        runTime={runTime}
        setRunTime={setRunTime}
      />
    </div>
  )
}

VideoSpecs.defaultProps = {
  playerOptions: {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  },
}

VideoSpecs.propTypes = {
  videoId: PropTypes.string.isRequired,
  playerOptions: PropTypes.shape({
    height: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
  }),
  onReady: PropTypes.func.isRequired,
  videoMeta: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  }).isRequired,
  runTime: PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
  }).isRequired,
  setRunTime: PropTypes.func.isRequired,
}

export default VideoSpecs
