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

const QuizEntry = ({ entry, onClickEntry }) => {
  return (
    <EntryContainer onClick={() => { onClickEntry(entry.id) }}>
      <div>{entry.entryTitle}</div>
      <img src={entry.thumbnail} alt="video thumbnail" />
    </EntryContainer>
  );
};

QuizEntry.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.string.isRequired,
    videoId: PropTypes.string.isRequired,
    videoTitle: PropTypes.string.isRequired,
    entryTitle: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
  onClickEntry: PropTypes.func.isRequired,
}

export default QuizEntry
