import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import VideoLengthSlider from './VideoLengthSlider'

const TimerContainer = styled.div`
  display: flex
  flex-direction: column
`

const NumberInput = styled.input`
  width: 60px
`

const TimerText = styled.div`
  align-self: stretch
`

const TimerSliderUIContainer = styled.div`
  display: flex
  flex-direction: row
`

const Container = styled.div`
  display: flex
  align-items: center
  flex-direction: column
`

const VideoLengthSliderContainer = ({ videoMeta, runTime, dispatch }) => {
  const handleRunTimeChangeStart = (value) => {
    dispatch({
      type: 'add',
      field: 'start',
      value: Math.trunc(Math.min(value, runTime.end)),
    })
  }

  const handleRunTimeChangeEnd = (value) => {
    dispatch({
      type: 'add',
      field: 'end',
      value: Math.trunc(
        Math.min(
          Math.max(value, runTime.start),
          videoMeta.max,
        ),
      ),
    })
  }

  return (
    <Container>

      <TimerContainer>
        <TimerText>
          Start time:
        </TimerText>
        <TimerSliderUIContainer>
          <VideoLengthSlider
            max={videoMeta.max}
            value={runTime.start}
            setTime={({ target }) => handleRunTimeChangeStart(target.value)}
          />

          <NumberInput
            type="number"
            value={runTime.start}
            min={videoMeta.min}
            max={runTime.end}
            onChange={({ target }) => handleRunTimeChangeStart(target.value)}
          />
          <div>seconds</div>
        </TimerSliderUIContainer>
      </TimerContainer>

      <TimerContainer>
        <TimerText>End time:</TimerText>
        <TimerSliderUIContainer>
          <VideoLengthSlider
            max={videoMeta.max}
            value={runTime.end}
            setTime={({ target }) => handleRunTimeChangeEnd(target.value)}
          />
          <NumberInput
            type="number"
            value={runTime.end}
            min={runTime.start}
            max={videoMeta.max}
            onChange={({ target }) => handleRunTimeChangeEnd(target.value)}
          />
          <div>seconds</div>
        </TimerSliderUIContainer>
      </TimerContainer>
    </Container>
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
  dispatch: PropTypes.func.isRequired,
}

export default VideoLengthSliderContainer
