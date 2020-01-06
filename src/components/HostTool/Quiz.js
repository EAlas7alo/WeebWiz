import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Title = styled.div`

`

const Video = styled.div`
  display: flex
  flex-direction: column
  font-size: 0.8em
`

const VideoList = styled.div`
  display: flex
  flex-direction: row 
`

function Quiz({ title, videoList }) {
  return (
    <div>
      <Title>
        {title}
      </Title>
      <VideoList>
        {videoList.map(video => {
          return (
            <Video>
              <div>{video.entryTitle}</div>
              <img src={video.thumbnail} alt="thumbnail" height={40} width={60} />
            </Video>
          )
        })}
      </VideoList>
    </div>
  )
}

Quiz.propTypes = {
  title: PropTypes.string.isRequired,
  videoList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Quiz
