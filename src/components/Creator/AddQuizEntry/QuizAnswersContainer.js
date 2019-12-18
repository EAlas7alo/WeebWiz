import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { editVideo } from '../../../redux/videoEntryReducer'
import QuizAnswer from './QuizAnswer'
import useWindowDimensions from '../../hooks/useWindowDimensions'

const AnswerColumn = styled.div`
  flex-direction: column
  margin-left: auto
  flex-grow: 1
`

const AnswerTable = styled.div`
  display: flex
  margin-left: 2em
  
`

const AnswersContainer = styled.div`
  flex: 1 1 auto
  min-width: 0
`

function QuizAnswersContainer({ video, editVideo }) {
  const windowDimensions = useWindowDimensions()
  const [width, setWidth] = useState(windowDimensions.width * 0.8)
  const [height, setHeight] = useState(width * 0.2)
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

  useEffect(() => {
    if (windowDimensions.width < 500) {
      setWidth(400)
      setHeight(40)
    } else {
      const newWidth = windowDimensions.width * 0.8
      setWidth(newWidth)
      setHeight(newWidth * 0.2)
    }

  }, [windowDimensions])

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
      <AnswerTable width={width}>
        {columns.map(column => (
          <AnswerColumn key={column[0].pos}>
            {column.map(answer => (
              <QuizAnswer
                width={width}
                height={height}
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
    <AnswersContainer width={width}>
      {renderAnswers()}
    </AnswersContainer>
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
