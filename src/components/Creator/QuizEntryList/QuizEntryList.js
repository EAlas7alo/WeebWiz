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
  display: flex
  flex-direction: column
  height: auto
  flex: 0.2
`

const ListContainer = styled.div`
  overflow: auto
  flex: 1
  
`

const AddEntryButton = styled(Button)`
  min-height: 40px
`

const QuizEntryList = ({ videoList, onClickEntry, onClickNewEntry }) => {
  const { innerHeight } = window

  const dimensions = {
    listContainer: `${innerHeight * 0.7}px`,
  }

  return (
    <Container height={dimensions.container}>
      <ListContainer height={dimensions.listContainer}>
        {videoList.map(entry => (
          <QuizEntry entry={entry} key={entry.id} onClickEntry={onClickEntry} />
        ))}
      </ListContainer>
      <AddEntryButton
        height={dimensions.button}
        onChange={onClickNewEntry}
      >
        Add a new entry
      </AddEntryButton>
    </Container>
  )
}

const mapStateToProps = state => {
  const { videoEntryReducer: { quizList, currentQuizId } } = state
  return {
    videoList: quizList.find(quiz => quiz.id === currentQuizId).videoList,
  }
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
