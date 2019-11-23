import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


const Answer = styled.div`
  padding-left: 5px
  border: 1px solid blue
  justify-content: center
  display: flex
`

const ButtonContainer = styled.div`
  justify-content: left
  margin-left: auto
`

const CorrectCheckmark = styled.input`

`

const AnswerInput = styled.input`
  padding: 2px 2px 2px 2px
  border: 0px hidden

  flex: 1
  &:focus {
    border: 0px hidden
  }
`

function QuizAnswer({ answer, onPressCorrect, onTextChange }) {
  const handleCorrectChange = () => {
    onPressCorrect(answer.pos)
  }

  const handleAnswerTextChange = (target) => {
    onTextChange(answer.pos, target.value)
  }

  return (
    <Answer pos={answer.pos}>
      <div>
        <AnswerInput
          type="text"
          value={answer.text}
          size={40}
          onChange={({ target }) => handleAnswerTextChange(target)}
        />
      </div>
      <ButtonContainer>
        <CorrectCheckmark type="checkbox" defaultChecked={answer.correct} onChange={handleCorrectChange} />
      </ButtonContainer>
    </Answer>
  )
}

QuizAnswer.propTypes = {
  answer: PropTypes.shape({
    text: PropTypes.string.isRequired,
    pos: PropTypes.number.isRequired,
    correct: PropTypes.bool.isRequired,
  }).isRequired,
  onPressCorrect: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
}

export default QuizAnswer
