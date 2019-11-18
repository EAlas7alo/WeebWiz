import { ADD_VIDEO, GET_VIDEOS, EDIT_VIDEO } from './actions'

const initialState = {
  videoList: [
    {
      id: '1',
      title: 'Ｊ Ｂ Ｐ Ｗ Ａ Ｖ Ｅ³　: A Jordan Peterson   Lofi Hip Hop Mix',
      videoId: 'H09e11JJwFk',
      start: 10,
      end: 20,
      thumbnail: 'https://i.ytimg.com/vi/H09e11JJwFk/default.jpg',
    },
    {
      id: '2',
      title: 'yee mania',
      videoId: 'tha07Sasx60',
      start: 0,
      end: 30,
      thumbnail: 'https://i.ytimg.com/vi/tha07Sasx60/default.jpg'
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
        ],
      }
    case EDIT_VIDEO:
      return {
        ...state,
        videoList: [
          ...state.videoList.filter(video => video.id !== action.video.id),
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

const editVideo = (video) => {
  return {
    type: EDIT_VIDEO,
    video,
  }
}

export { addVideo, editVideo }
