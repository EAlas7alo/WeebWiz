import React from 'react';
import PropTypes from 'prop-types'
import QuizEntry from './QuizEntry';

const QuizEntryList = ({ entryList }) => {

  return (
    <div>
      {entryList.map(entry => (
        <QuizEntry entry={entry} key={entry.id} />
      ))}
    </div>
  );
};

QuizEntryList.propTypes = {
  entryList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    videoId: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
  })).isRequired,
}

export default QuizEntryList
