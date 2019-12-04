import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TimeSetters from './TimeSetters'

const Container = styled.div`
  display: flex
  align-items: center
  flex-direction: column
`

const VideoLengthSliderContainer = ({ videoMeta, runTime, dispatch }) => {
  const handleRunTimeChangeStart = (value) => {
    console.log()
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
  console.log(runTime)
  return (
    <Container>
      <TimeSetters
        sliderMax={runTime.end}
        videoMeta={videoMeta}
        initialValue={runTime.start}
        handleChange={handleRunTimeChangeStart}
        numberInputMax={runTime.end}
        timerText="Start time:"
      />
      <TimeSetters
        sliderMax={videoMeta.max}
        sliderMin={runTime.start}
        videoMeta={videoMeta}
        initialValue={runTime.end}
        handleChange={handleRunTimeChangeEnd}
        numberInputMax={videoMeta.max}
        numberInputMin={runTime.start}
        timerText="End Time:"
      />
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
