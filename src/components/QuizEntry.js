import React from 'react'
import PropTypes from 'prop-types'

const QuizEntry = ({ entry }) => {
  return (
    <div>
      {entry.title}
    </div>
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
