import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import QuizAnswer from './QuizAnswer'

const AnswerColumn = styled.div`
  flex-direction: column
  margin-left: auto
  flex-grow: 1
`

const AnswerTable = styled.div`
  border: 2px solid red
  display: flex
`

function QuizAnswersContainer({ answers }) {

  const renderNewEntry = () => {

  }

  const renderExistingEntry = () => {
    const firstColumn = answers.slice(0, 2)
    const secondColumn = answers.slice(2)
    console.log(answers)
    console.log(secondColumn)
    return (
      <AnswerTable>
        <AnswerColumn>
          {firstColumn.map(answer => (
            <QuizAnswer answer={answer} key={answer.pos} horOrientation='right' />
          ))}
        </AnswerColumn>
        <AnswerColumn>
          {secondColumn.map(answer => (
            <QuizAnswer answer={answer} key={answer.pos} horOrientation='left' />
          ))}
        </AnswerColumn>
      </AnswerTable>
    )
  }
  return (
    <div>
      {answers === null && (
        renderNewEntry()
      )}
      {answers && (
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
