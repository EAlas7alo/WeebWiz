import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import VideoLengthSlider from './VideoLengthSlider'

const VideoLengthSliderContainer = ({ videoMeta, runTime, setRunTime }) => {

  return (
    <div>
      Start time:
      <VideoLengthSlider
        max={videoMeta.max}
        value={runTime.start}
        setTime={
          ({ target }) => setRunTime(runTime => {
            return { ...runTime, start: Math.min(target.value, runTime.end) }
          })
        }
      />
      <br />
      End time:
      <VideoLengthSlider
        max={videoMeta.max}
        value={runTime.end}
        setTime={
          ({ target }) => setRunTime(runTime => {
            return { ...runTime, end: Math.max(target.value, runTime.start) }
          })
        }
      />
    </div>
  );
}

VideoLengthSliderContainer.propTypes = {
  videoMeta: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number.isRequired,
  }).isRequired,
  runTime: PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
  }).isRequired,
  setRunTime: PropTypes.func.isRequired,
}

export default VideoLengthSliderContainer
