import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import VideoLengthSlider from './VideoLengthSlider'

const NumberInput = styled.input`
  width: 60px
`

const TimerContainer = styled.div`
  display: flex
  flex-direction: column
`


const TimerText = styled.div`
  align-self: stretch
`

const TimerSliderUIContainer = styled.div`
  display: flex
  flex-direction: row
`

function TimeSetters({
  sliderMin,
  sliderMax,
  initialValue,
  handleChange,
  numberInputMin,
  numberInputMax,
  videoMeta,
  timerText,
}) {
  const [currentValue, setCurrentValue] = useState(initialValue)
  const handleLocalChange = (event) => {
    if (sliderMax === videoMeta.max) {
      setCurrentValue(Math.max(Math.min(sliderMax, event.target.value), sliderMin))
    } else {
      setCurrentValue(Math.min(sliderMax, event.target.value))
    }
  }

  useEffect(() => {
    setCurrentValue(initialValue)
  }, [videoMeta])
  return (
    <TimerContainer>
      <TimerText>{timerText}</TimerText>
      <TimerSliderUIContainer>
        <VideoLengthSlider
          min={sliderMin}
          max={sliderMax}
          videoMeta={videoMeta}
          value={currentValue}
          setTime={handleChange}
          handleLocalChange={handleLocalChange}
        />
        <NumberInput
          type="number"
          value={currentValue}
          videoMeta={videoMeta}
          min={numberInputMin}
          max={numberInputMax}
          onChange={handleChange}
        />
      </TimerSliderUIContainer>
      <div>seconds</div>
    </TimerContainer>
  )
}

TimeSetters.defaultProps = {
  sliderMax: 0,
  sliderMin: 0,
  numberInputMax: 0,
  numberInputMin: 0,
  timerText: '',
}

TimeSetters.propTypes = {
  sliderMax: PropTypes.number,
  sliderMin: PropTypes.number,
  initialValue: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  numberInputMin: PropTypes.number,
  numberInputMax: PropTypes.number,
  videoMeta: PropTypes.objectOf(PropTypes.number).isRequired,
  timerText: PropTypes.string,
}

export default TimeSetters
