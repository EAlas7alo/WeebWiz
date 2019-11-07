import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import VideoLengthSlider from './VideoLengthSlider'

const VideoLengthSliderContainer = ({ videoMeta }) => {
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(1)

  useEffect(() => {
    setEndTime(videoMeta.max)
  }, [videoMeta])

  return (
    <div>
      Start time:
      <VideoLengthSlider
        max={videoMeta.max}
        value={startTime}
        setTime={({ target }) => setStartTime(Math.min(target.value, endTime))}
      />
      <br />
      End time:
      <VideoLengthSlider
        max={videoMeta.max}
        value={endTime}
        setTime={({ target }) => setEndTime(Math.max(target.value, startTime))}
      />
    </div>
  );
}

VideoLengthSliderContainer.propTypes = {
  videoMeta: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number.isRequired,
  }).isRequired,
}

export default VideoLengthSliderContainer
