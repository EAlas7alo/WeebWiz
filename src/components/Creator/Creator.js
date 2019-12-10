import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import uuid from 'uuid/v4'
import defaultThumbnail from '../../graphics/defaultthumbnail.png'
import QuizEntryList from './QuizEntryList/QuizEntryList'
import AddVideoView from './AddQuizEntry/AddVideoView'
import { addVideo, setCurrentVideo } from '../../redux/videoEntryReducer'


const CreatorContainer = styled.div`
  display: flex
  flex-direction: row
  height: 100%
`

function Creator({ videoList, addVideo, setCurrentVideo }) {
  const onClickEntry = (id) => {
    const clickedEntry = videoList.find(video => video.id === id)
    setCurrentVideo(id)
    console.log(clickedEntry)
  }

  const onClickNewEntry = () => {
    const newVideoEntry = {
      entryTitle: '',
      videoTitle: '',
      id: uuid(),
      videoId: '',
      start: 0,
      end: 0,
      thumbnail: defaultThumbnail,
      videoMeta: {
        min: 0,
        max: 0,
      },
      answers: [
        {
          pos: 1,
          text: 'Answer 1',
          correct: false,
        },
        {
          pos: 2,
          text: 'Answer 2',
          correct: false,
        },
        {
          pos: 3,
          text: 'Answer 3',
          correct: false,
        },
        {
          pos: 4,
          text: 'Answer 4',
          correct: false,
        },
      ],
    }
    addVideo(newVideoEntry)
    setCurrentVideo(newVideoEntry.id)
  }

  return (
    <CreatorContainer>
      <QuizEntryList onClickEntry={onClickEntry} onClickNewEntry={onClickNewEntry} />
      <AddVideoView />
    </CreatorContainer>
  )
}

const mapStateToProps = state => {
  const { videoEntryReducer: { videoList } } = state
  return { videoList }
}

const mapDispatchToProps = dispatch => {
  return {
    addVideo: video => {
      dispatch(addVideo(video))
    },
    setCurrentVideo: id => {
      dispatch(setCurrentVideo(id))
    },
  }
}

Creator.propTypes = {
  videoList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    videoId: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
  })).isRequired,
  addVideo: PropTypes.func.isRequired,
  setCurrentVideo: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Creator)
