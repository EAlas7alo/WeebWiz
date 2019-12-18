import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Checkbox from '../../StyledComponents/Checkbox'

const Answer = styled.div`
  padding-left: 5px
  justify-content: center
  border-radius: 5px
  display: flex
  background: snow
  min-width: 0
`

const AnswerInput = styled.input`
  padding: 2px 2px 2px 2px
  border: 0px hidden
  -webkit-appearance: none
  background: snow
  flex: 1
  font-size: 28px
  &:focus {
    outline: none
  }
  flex-basis: 100%
  min-width: 0
  
`

function QuizAnswer({ answer, onPressCorrect, onTextChange, width, height }) {
  const [isFocused, setIsFocused] = useState(false)

  const handleCorrectChange = () => {
    onPressCorrect(answer.pos)
  }

  const handleAnswerTextChange = (target) => {
    onTextChange(answer.pos, target.value)
  }

  const onFocusAnswerInput = () => {
    setIsFocused(!isFocused)
  }

  return (
    <Answer
      pos={answer.pos}
      isFocused={isFocused}
      width={width}
      height={height}
    >
      <div>
        <AnswerInput
          type="text"
          value={answer.text}
          size={40}
          onChange={({ target }) => handleAnswerTextChange(target)}
          onFocus={onFocusAnswerInput}
          onBlur={onFocusAnswerInput}
        />
      </div>
      <label>
        <Checkbox checked={answer.correct} onChange={handleCorrectChange} />
      </label>
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
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

export default QuizAnswer
