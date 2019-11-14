import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import './App.css';
import Modal from 'react-modal'
import asyncLoad from 'react-async-loader'
import AddVideoView from './components/AddQuizEntry/AddVideoView';
import QuizEntryList from './components/QuizEntryList';

import { findVideosById } from './logic/youtubeApi'

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
    title: 'sample title 1',
    videoId: 'H09e11JJwFk',
    start: 10,
    end: 20,
  },
  {
    id: '2',
    title: 'sample title 2',
    videoId: 'tha07Sasx60',
    start: 0,
    end: 30,
  },
]


function App({ gapi }) {
  const [isModalOpen, setModalOpen] = useState(false)
  const [apiLoaded, setApiLoaded] = useState(false)
  const [quizEntries, setQuizEntries] = useState(defaultQuizEntries)
  Modal.setAppElement('#root')

  useEffect(() => {
    const loadYoutube = async () => {
      await gapi.load('client', async () => {
        await gapi.client.init({
          apiKey: 'AIzaSyCSD3h36OqoZ6UIgRlia44CADCe9EHvDmM',
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
        })
        setApiLoaded(true)
      })
    }
    loadYoutube()
  }, [])

  if (apiLoaded) {
    const videoIds = quizEntries.map(entry => entry.videoId)
    const getVideoData = async () => {
      const { result: { items } } = findVideosById(videoIds)
      return items
    }
  }

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

const mapScriptsToProps = (props) => {
  return {
    gapi: {
      globalPath: 'gapi',
      url: 'https://apis.google.com/js/api.js',
    },
  }
}

App.defaultProps = {
  gapi: null,
}

App.propTypes = {
  gapi: PropTypes.shape({
    client: PropTypes.objectOf(PropTypes.object),
    load: PropTypes.func.isRequired,
  }),
}

export default asyncLoad(mapScriptsToProps)(App);
