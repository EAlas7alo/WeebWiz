import React from 'react';
import PropTypes from 'prop-types'

const VideoLengthSlider = ({ min, max, value, setTime }) => {
  return (
    <div>
      <input type="range" min={min} max={max} value={value} onChange={setTime} />
    </div>
  )
}

VideoLengthSlider.defaultProps = {
  min: 0,
}

VideoLengthSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number.isRequired,
  setTime: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
}

export default VideoLengthSlider
