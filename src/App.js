import React, { useState } from 'react';
import './App.css';
import Modal from 'react-modal'
import AddVideoView from './components/AddQuizEntry/AddVideoView';

function App() {
  const [isModalOpen, setModalOpen] = useState(false)
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
        >
          <button type="button" onClick={() => setModalOpen(false)}>Close modal</button>
          <AddVideoView />
        </Modal>
      </div>
    </div>
  );
}

export default App;
