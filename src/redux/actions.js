export const SET_START_TIME = 'SET_START_TIME'
export const SET_END_TIME = 'SET_END_TIME'

export const setStartTime = (time) => {
  return { type: SET_START_TIME, time }
}

export const setEndTime = (time) => {
  return { type: SET_END_TIME, time }
}
