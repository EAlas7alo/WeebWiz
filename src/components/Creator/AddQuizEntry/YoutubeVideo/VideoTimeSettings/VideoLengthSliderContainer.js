import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { editVideo } from '../../../../../redux/videoEntryReducer'
import TimeSetters from './TimeSetters'
import Checkbox from '../../../../StyledComponents/Checkbox'

const Container = styled.div`
  display: flex
  justify-content: center
`

const HideButtonContainer = styled.div`
  align-self: center
  display: flex
  flex-direction: row
  margin-left: 3rem
  justify-content: space-evenly
`

const SliderContainer = styled.div`
  align-items: center
  flex-direction: column
`

const HideVideoCheckBox = styled(Checkbox)`
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

  const handleHideVideoChange = () => {
    console.log('I am triggered!')
    editVideo({
      ...videoData,
      hideVideo: !videoData.hideVideo,
    })
  }

  return (
    <Container>
      <SliderContainer>
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
      </SliderContainer>
      <HideButtonContainer>
        <div>Hide video during quiz</div>
        <label>
          <HideVideoCheckBox
            checked={videoData.hideVideo}
            onChange={handleHideVideoChange}
            size="small"
          />
        </label>
      </HideButtonContainer>
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
    hideVideo: PropTypes.bool.isRequired,
  }).isRequired,
  runTime: PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
  }).isRequired,
  editVideo: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(VideoLengthSliderContainer)
