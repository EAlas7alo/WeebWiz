import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import QuizAnswer from './QuizAnswer'

function QuizAnswersContainer(props) {
  return (
    <div>
      {props.answers.map(answer => (
        <QuizAnswer answer={answer} />
      ))}
    </div>
  )
}

QuizAnswersContainer.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.object).isRequired,
}

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  const entry = state.videoEntryReducer.videoList.filter(video => video.id === ownProps.id)[0]
  return { answers: entry.answers }
}

export default connect(mapStateToProps)(QuizAnswersContainer)
