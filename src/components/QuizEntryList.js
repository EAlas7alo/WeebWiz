import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import QuizEntry from './QuizEntry'

const Container = styled.div`
  border-color: black
  border-width: 1px
  text-align: left
  margin-left: 20px
  margin-top: 5px
`

const QuizEntryList = ({ videoList, onClickEntry }) => {
  console.log(videoList)
  return (
    <Container>
      {videoList.map(entry => (
        <QuizEntry entry={entry} key={entry.id} onClickEntry={onClickEntry} />
      ))}
    </Container>
  );
};

const mapStateToProps = state => {
  const { videoEntryReducer: { videoList } } = state
  return { videoList }
}

QuizEntryList.propTypes = {
  videoList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    videoId: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
  })).isRequired,
  onClickEntry: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(QuizEntryList)
