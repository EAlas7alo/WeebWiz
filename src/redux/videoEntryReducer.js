const initialState = {

}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case ADD_VIDEO_ENTRY:
    return { ...state, ...payload }

  default:
    return state
  }
}
