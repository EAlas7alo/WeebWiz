import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom'
import './App.css'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import asyncLoad from 'react-async-loader'
import styled, { createGlobalStyle } from 'styled-components'
import Creator from './components/Creator/Creator'

const AppContainer = styled.div`
  background-color: rgb(255, 255, 255);
`

const GlobalStyle = createGlobalStyle`
  body {
    background-color: rgb(255, 255, 255)
    font: 'Montserrat'
  }

`

function App({ gapi }) {
  const [apiLoaded, setApiLoaded] = useState(false)
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

  return (
    <AppContainer id="root">
      <GlobalStyle />
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
              <Creator />
            </Route>
            <Route path="/">
              xd
            </Route>
          </Switch>
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
}

const asyncApp = asyncLoad(mapScriptsToProps)(App)

export default connect(mapStateToProps)(asyncApp);
