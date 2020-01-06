import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Quiz from './Quiz'

function QuizList({ quizList }) {
  return (
    <div>
      {quizList.map(quiz => {
        return (
          <Quiz key={quiz.id} title={quiz.title} videoList={quiz.videoList} />
        )
      })}
    </div>
  )
}

const mapStateToProps = state => {
  const { videoEntryReducer: { quizList } } = state
  return {
    quizList,
  }
}

QuizList.propTypes = {
  quizList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default connect(mapStateToProps)(QuizList)
