import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'

const TimeSlider = styled.input`
  border-width: 0.2em
  border-color: black
  background: gray
  border-radius: 15px
  -webkit-appearance: none
  opacity: 0.7
  &:hover {
    opacity: 1
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none
    appearance: none
    width: 25px
    height: 25px
    background: white
    border-radius: 50%
    
  }
`

const VideoLengthSlider = ({ value, setTime, videoMeta, handleLocalChange }) => {
  const updateStoreValue = () => {
    setTime(value)
  }

  return (
    <div>
      <TimeSlider
        type="range"
        max={videoMeta.max}
        value={value}
        onChange={handleLocalChange}
        onMouseUp={updateStoreValue}
      />
    </div>
  )
}


VideoLengthSlider.propTypes = {
  setTime: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  videoMeta: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  }).isRequired,
  handleLocalChange: PropTypes.func.isRequired,
}

export default VideoLengthSlider
