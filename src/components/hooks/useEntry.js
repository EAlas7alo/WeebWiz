import React, { useState, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'

const initialState = {
  answers: null,
  end: 0,
  start: 0,
  videoId: '',
  entryTitle: '',
  videoTitle: '',
  thumbnail: '',
}

const entryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        [action.field]: action.value,
      }
    default:
      return state
  }
}

function useEntry(entry) {
  /*const [videoId, setVideoId] = useState(videoData ? videoData.videoId : '')
  const [entryTitle, setEntryTitle] = useState(videoData ? videoData.entryTitle : '')
  const [videoMeta, setVideoMeta] = useState({ min: 0, max: 0 })
  const [runTime, setRunTime] = useState({
    start: videoData ? videoData.start : 0,
    end: videoData ? videoData.end : 0 })*/
  const initializedEntry = entry || initialState
  const [state, dispatch] = useReducer(entryReducer, initializedEntry)

  return {
    state,
    dispatch,
  }
}


export default useEntry
