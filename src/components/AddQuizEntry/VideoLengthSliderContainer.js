import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import VideoLengthSlider from './VideoLengthSlider'

const TimerContainer = styled.div`
  display: flex
  flex-direction: row
`

const NumberInput = styled.input`
  width: 60px
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
    <div>
      <div>
        Start time:
      </div>
      <TimerContainer>
        <div>
          <VideoLengthSlider
            max={videoMeta.max}
            value={runTime.start}
            setTime={({ target }) => handleRunTimeChangeStart(target.value)}
          />
        </div>

        <NumberInput
          type="number"
          value={runTime.start}
          min={videoMeta.min}
          max={runTime.end}
          onChange={({ target }) => handleRunTimeChangeStart(target.value)}
        />
      </TimerContainer>

      <br />
      <div>End time:</div>
      <TimerContainer>
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
      </TimerContainer>
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
  dispatch: PropTypes.func.isRequired,
}

export default VideoLengthSliderContainer
