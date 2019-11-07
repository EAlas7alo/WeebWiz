import { SET_END_TIME, SET_START_TIME } from './actions'

const initialState = {
  startTime: 0,
  endTime: 0,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_END_TIME:
      return { ...state, endTime: payload.endTime }
    case SET_START_TIME:
      return { ...state, startTime: payload.startTime }
    default:
      return state
  }
}
