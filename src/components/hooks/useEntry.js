import React, { useState, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'

const initialState = {
  answers: null,
  start: 0,
  end: 0,
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
  const initializedEntry = entry || initialState
  const [state, dispatch] = useReducer(entryReducer, initializedEntry)
  console.log(state)
  return {
    state,
    dispatch,
  }
}


export default useEntry
