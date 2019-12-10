import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { editVideo } from '../../../../../redux/videoEntryReducer'
import TimeSetters from './TimeSetters'

const Container = styled.div`
  display: flex
  align-items: center
  flex-direction: column
`

const VideoLengthSliderContainer = ({ videoData, runTime, editVideo }) => {
  const handleRunTimeChangeStart = (value) => {
    editVideo({
      ...videoData,
      start: value,
    })
  }

  const handleRunTimeChangeEnd = (value) => {
    editVideo({
      ...videoData,
      end: value,
    })
  }

  return (
    <Container>
      <TimeSetters
        sliderMax={runTime.end}
        videoMeta={videoData.videoMeta}
        initialValue={runTime.start}
        handleChange={handleRunTimeChangeStart}
        numberInputMax={runTime.end}
        timerText="Start time:"
      />
      <TimeSetters
        sliderMax={videoData.videoMeta.max}
        sliderMin={runTime.start}
        videoMeta={videoData.videoMeta}
        initialValue={runTime.end}
        handleChange={handleRunTimeChangeEnd}
        numberInputMax={videoData.videoMeta.max}
        numberInputMin={runTime.start}
        timerText="End Time:"
      />
    </Container>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    editVideo: video => {
      dispatch(editVideo(video))
    },
  }
}

VideoLengthSliderContainer.propTypes = {
  videoData: PropTypes.shape({
    videoMeta: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  runTime: PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
  }).isRequired,
  editVideo: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(VideoLengthSliderContainer)
