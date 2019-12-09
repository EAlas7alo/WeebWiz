import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { editVideo } from '../../../redux/videoEntryReducer'
import QuizAnswer from './QuizAnswer'

const AnswerColumn = styled.div`
  flex-direction: column
  margin-left: auto
  flex-grow: 1
`

const AnswerTable = styled.div`
  display: flex
  margin-left: 2em
`

function QuizAnswersContainer({ video, editVideo }) {
  const { answers } = video
  const handleToggleAnswer = (pos) => {
    const answer = answers.find(answer => answer.pos === pos)
    editVideo({
      ...video,
      answers: [
        ...answers.filter(answer => answer.pos !== pos),
        {
          ...answer,
          correct: !answer.correct,
        },
      ],
    })
  }

  const handleAnswerTextChange = (pos, text) => {
    const answer = answers.find(answer => answer.pos === pos)
    editVideo({
      ...video,
      answers: [
        ...answers.filter(answer => answer.pos !== pos),
        {
          ...answer,
          text,
        },
      ],
    })
  }

  const renderAnswers = () => {
    const sortedAnswers = answers.sort((a, b) => a.pos - b.pos)
    const firstColumn = sortedAnswers.filter(answer => answer.pos < 3)
    const secondColumn = sortedAnswers.filter(answer => answer.pos > 2)
    const columns = [firstColumn, secondColumn]
    return (
      <AnswerTable>
        {columns.map(column => (
          <AnswerColumn key={column[0].pos}>
            {column.map(answer => (
              <QuizAnswer
                answer={answer}
                key={answer.pos}
                onPressCorrect={handleToggleAnswer}
                onTextChange={handleAnswerTextChange}
              />
            ))}
          </AnswerColumn>
        ))}
      </AnswerTable>
    )
  }
  return (
    <div>
      {renderAnswers()}
    </div>
  )
}

const mapStateToProps = state => {
  const { videoEntryReducer: { videoList, currentVideoId } } = state
  const video = videoList.find(video => video.id === currentVideoId)
  return { video }
}

const mapDispatchToProps = dispatch => {
  return {
    editVideo: video => {
      dispatch(editVideo(video))
    },
  }
}


QuizAnswersContainer.propTypes = {
  video: PropTypes.objectOf(PropTypes.object).isRequired,
  editVideo: PropTypes.func.isRequired,
}


export default connect(mapStateToProps, mapDispatchToProps)(QuizAnswersContainer)
