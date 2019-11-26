import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import './App.css'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import asyncLoad from 'react-async-loader'
import styled from 'styled-components'
import AddVideoView from './components/AddQuizEntry/AddVideoView'
import QuizEntryList from './components/QuizEntryList'

const modalStyles = {
  content: {
    top: '5%',
    left: '25%',
    right: '25%',
    bottom: 'auto',
  },
}

const AddVideoModalContainer = styled.div`
  background-color: #ffffcc
`

const AppContainer = styled.div`
  background-color: #ffffcc
`

function App({ gapi, videoList }) {
  const [isModalOpen, setModalOpen] = useState(false)
  const [apiLoaded, setApiLoaded] = useState(false)
  const [videoData, setVideoData] = useState(null)
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
    /* const videoIds = videoList.map(entry => entry.videoId)
    const getVideoData = async () => {
      const { result: { items } } = await findVideosById(videoIds)
      return items
    }
    getVideoData().then(res => {
      console.log(res)
    }) */
  }

  const onClickEntry = (id) => {
    const clickedEntry = videoList.filter(video => video.id === id)
    if (!isModalOpen) {
      setVideoData(clickedEntry[0])
      setModalOpen(true)
    }
  }

  const handleModalClose = () => {
    setVideoData(null)
    setModalOpen(false)
  }

  return (
    <AppContainer id="root">
      <Router>
        <div>
          <nav>
            <h1>
              WeebWiz
            </h1>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/creator">Creator</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/creator">
              <QuizEntryList onClickEntry={onClickEntry} />
              <AddVideoView
                setModalOpen={setModalOpen}
                videoData={videoData}
                setVideoData={setVideoData}
              />
            </Route>
            <Route path="/">
              xd
            </Route>
          </Switch>
          <div className="content">
            <button type="button" onClick={() => setModalOpen(true)}>Add a video</button>
            <Modal
              isOpen={isModalOpen}
              onRequestClose={handleModalClose}
              style={modalStyles}
            >
              <AddVideoModalContainer>
                <button type="button" onClick={handleModalClose}>Close modal</button>
                <AddVideoView
                  setModalOpen={setModalOpen}
                  videoData={videoData}
                  setVideoData={setVideoData}
                />
              </AddVideoModalContainer>
            </Modal>
          </div>
        </div>
      </Router>

    </AppContainer>
  );
}

const mapStateToProps = state => {
  const { videoEntryReducer: { videoList } } = state
  return { videoList }
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
    client: PropTypes.shape({
      init: PropTypes.func.isRequired,
    }),
    load: PropTypes.func.isRequired,
  }),
  videoList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

const asyncApp = asyncLoad(mapScriptsToProps)(App)

export default connect(mapStateToProps)(asyncApp);
