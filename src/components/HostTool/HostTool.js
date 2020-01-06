import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import QuizList from './QuizList'

const Container = styled.div`

`

const HostHeader = styled.div`

`

function HostTool(props) {
  return (
    <Container>
      <HostHeader>
        <h3>Choose a quiz you wish to use for this game from the list below</h3>
      </HostHeader>
      <QuizList />
    </Container>
  )
}

HostTool.propTypes = {

}

const mapStateToProps = state => {
  const { videoEntryReducer: { quizList } } = state
  return {
    quizList,
  }
}

export default connect(mapStateToProps)(HostTool)
