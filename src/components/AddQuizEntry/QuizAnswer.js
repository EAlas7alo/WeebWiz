import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Answer = styled.div`
  border: 1px solid blue
  justify-content: center
  display: flex
`

function QuizAnswer({ answer }) {
  return (
    <Answer pos={answer.pos}>
      <div>
        {answer.text}
      </div>
    </Answer>
  )
}

QuizAnswer.propTypes = {
  answer: PropTypes.shape({
    text: PropTypes.string.isRequired,
    pos: PropTypes.number.isRequired,
  }).isRequired,
}

export default QuizAnswer
