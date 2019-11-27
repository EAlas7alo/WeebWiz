import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
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

function QuizAnswersContainer({ answers, dispatch }) {
  const handleToggleAnswer = (pos) => {
    const answer = answers.find(answer => answer.pos === pos)
    dispatch({
      type: 'add',
      field: 'answers',
      value: [
        ...answers.filter(answer => answer.pos !== pos),
        {
          ...answer,
          correct: !answer.correct,
        },
      ],
    })
    console.log(answers)
  }

  const handleAnswerTextChange = (pos, text) => {
    const answer = answers.find(answer => answer.pos === pos)
    dispatch({
      type: 'add',
      field: 'answers',
      value: [
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

QuizAnswersContainer.defaultProps = {
  answers: null,
}

QuizAnswersContainer.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.object),
  dispatch: PropTypes.func.isRequired,
}


export default QuizAnswersContainer
