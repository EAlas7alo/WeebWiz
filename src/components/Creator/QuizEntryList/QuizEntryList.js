import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import QuizEntry from './QuizEntry'
import Button from '../../StyledComponents/Button'

const Container = styled.div`
  border: 1px solid black
  text-align: left
  margin-left: 20px
  margin-top: 5px
  flex-wrap: wrap
  display: flex
  flex-direction: column
`

const QuizEntryList = ({ videoList, onClickEntry, onClickNewEntry }) => {

  return (
    <Container>
      {videoList.map(entry => (
        <QuizEntry entry={entry} key={entry.id} onClickEntry={onClickEntry} />
      ))}
      <Button onChange={onClickNewEntry}>Add a new entry</Button>
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
  onClickNewEntry: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(QuizEntryList)
