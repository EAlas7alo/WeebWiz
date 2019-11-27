import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import QuizEntryList from './QuizEntryList/QuizEntryList'
import AddVideoView from './AddQuizEntry/AddVideoView'

const CreatorContainer = styled.div`
  display: flex
  flex-direction: row

`

function Creator({ videoList }) {
  const [videoData, setVideoData] = useState(videoList[0])
  const onClickEntry = (id) => {
    const clickedEntry = videoList.find(video => video.id === id)
    setVideoData(clickedEntry)
    console.log(clickedEntry)
  }

  return (
    <CreatorContainer>
      <QuizEntryList onClickEntry={onClickEntry} />
      <AddVideoView
        videoData={videoData}
        setVideoData={setVideoData}
      />
    </CreatorContainer>
  )
}

const mapStateToProps = state => {
  const { videoEntryReducer: { videoList } } = state
  return { videoList }
}

Creator.propTypes = {
  videoList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    videoId: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
  })).isRequired,
}

export default connect(mapStateToProps)(Creator)
