import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Youtube from 'react-youtube'
import VideoLengthSliderContainer from './VideoTimeSettings/VideoLengthSliderContainer'

function VideoSpecs({ videoId, playerOptions, onReady, videoData, runTime, dispatch }) {
  return (
    <div>
      <Youtube
        videoId={videoId}
        opts={playerOptions}
        onReady={onReady}
      />
      <VideoLengthSliderContainer
        videoData={videoData}
        runTime={runTime}
        dispatch={dispatch}
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
  dispatch: PropTypes.func.isRequired,
}

export default VideoSpecs
