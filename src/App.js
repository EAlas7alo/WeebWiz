import React, { useState } from 'react';
import './App.css';
import Modal from 'react-modal'
import AddVideoView from './components/AddQuizEntry/AddVideoView';
import QuizEntryList from './components/QuizEntryList';

const modalStyles = {
  content: {
    top: '20%',
    left: '25%',
    right: '25%',
    bottom: 'auto',
  },
}

const defaultQuizEntries = [
  {
    id: '1',
    videoId: 'H09e11JJwFk',
    start: 10,
    end: 20,
  },
  {
    id: '2',
    videoId: 'tha07Sasx60',
    start: 0,
    end: 30,
  },
]

function App() {
  const [isModalOpen, setModalOpen] = useState(false)
  const [quizEntries, setQuizEntries] = useState(defaultQuizEntries)
  Modal.setAppElement('#root')

  return (
    <div className="App" id="root">
      <h1>
        WeebWiz
      </h1>
      <div className="content">
        <button type="button" onClick={() => setModalOpen(true)}>Add a video</button>
        <Modal
          isOpen={isModalOpen}
          style={modalStyles}
        >
          <button type="button" onClick={() => setModalOpen(false)}>Close modal</button>
          <AddVideoView />
        </Modal>
        <QuizEntryList entryList={quizEntries} />
      </div>
    </div>
  );
}

export default App;
