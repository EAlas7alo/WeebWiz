import { ADD_VIDEO, GET_VIDEOS } from './actions'

const initialState = {
  videoList: [
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
  ],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_VIDEO:
      return { ...state,
        videoList: [
          ...state.videoList,
          action.video,
        ]
      }
    case GET_VIDEOS:
      return state.videoList
    default:
      return state
  }
}

const addVideo = (video) => {
  return {
    type: ADD_VIDEO,
    video,
  }
}

export { addVideo }
