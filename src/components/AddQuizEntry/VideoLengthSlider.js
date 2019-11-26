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

const VideoLengthSlider = ({ min, max, value, setTime }) => {
  return (
    <div>
      <TimeSlider type="range" min={min} max={max} value={value} onChange={setTime} />
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
