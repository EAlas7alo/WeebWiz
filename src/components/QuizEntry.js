import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const EntryContainer = styled.div`
  flex-direction: column
  border-radius: 8px
  &:hover {
    border-color: gray
    border: 1px groove gray
  }
`

const QuizEntry = ({ entry }) => {
  console.log(entry)
  return (
    <EntryContainer>
      <div>{entry.title}</div>
      <img src={entry.thumbnail} alt="video thumbnail" />
    </EntryContainer>
  );
};

QuizEntry.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.string.isRequired,
    videoId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
  }).isRequired,
}

export default QuizEntry
