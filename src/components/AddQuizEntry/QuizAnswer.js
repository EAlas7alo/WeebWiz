import React from 'react'
import PropTypes from 'prop-types'

function QuizAnswer({ answer }) {
  return (
    <div>
      <div>
        {answer.text}
      </div>
    </div>
  )
}

QuizAnswer.propTypes = {
  answer: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }).isRequired,
}

export default QuizAnswer
