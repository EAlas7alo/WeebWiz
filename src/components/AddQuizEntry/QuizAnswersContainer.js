import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import QuizAnswer from './QuizAnswer'

function QuizAnswersContainer(props) {

  const renderNewEntry = () => {

  }

  const renderExistingEntry = () => {
    return (
      <div>
        {props.answers.map(answer => (
          <QuizAnswer answer={answer} key={answer.pos} />
        ))}
      </div>
    )
  }
  return (
    <div>
      {props.answers === null && (
        renderNewEntry()
      )}
      {props.answers && (
        renderExistingEntry()
      )}
    </div>
  )
}

QuizAnswersContainer.defaultProps = {
  answers: null,
}

QuizAnswersContainer.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.object),
}

const mapStateToProps = (state, ownProps) => {
  if (!ownProps.id) return { answers: null }
  const { answers } = state.videoEntryReducer.videoList.filter(video => video.id === ownProps.id)[0]
  return { answers }
}

export default connect(mapStateToProps)(QuizAnswersContainer)
