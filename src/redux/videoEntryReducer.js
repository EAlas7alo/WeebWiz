import { ADD_VIDEO, GET_VIDEOS, EDIT_VIDEO, SET_CURRENT_VIDEO } from './actions'

const initialState = {
  videoList: [
    {
      id: '1',
      entryTitle: 'Writer',
      videoTitle: 'Ｊ Ｂ Ｐ Ｗ Ａ Ｖ Ｅ³　: A Jordan Peterson   Lofi Hip Hop Mix',
      videoId: 'H09e11JJwFk',
      start: 10,
      end: 20,
      thumbnail: 'https://i.ytimg.com/vi/H09e11JJwFk/default.jpg',
      hideVideo: true,
      videoMeta: {
        min: 0,
        max: 2944,
      },
      answers: [
        {
          pos: 1,
          text: 'Jordan Peterson',
          correct: true,
        },
        {
          pos: 2,
          text: 'Nick Land',
          correct: false,
        },
        {
          pos: 3,
          text: 'Oprah',
          correct: false,
        },
        {
          pos: 4,
          text: 'Hagakure',
          correct: false,
        },
      ],
    },
    {
      id: '2',
      entryTitle: 'Name of meme',
      videoTitle: 'yee mania',
      videoId: 'tha07Sasx60',
      start: 0,
      end: 30,
      thumbnail: 'https://i.ytimg.com/vi/tha07Sasx60/default.jpg',
      hideVideo: false,
      videoMeta: {
        min: 0,
        max: 86,
      },
      answers: [
        {
          pos: 1,
          text: 'yee',
          correct: true,
        },
        {
          pos: 2,
          text: 'pepe',
          correct: false,
        },
        {
          pos: 3,
          text: 'pikachu',
          correct: false,
        },
        {
          pos: 4,
          text: 'jarmio',
          correct: false,
        },
      ],
    },
  ],
  currentVideoId: '1',
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
          ...state.videoList.map(video => {
            if (video.id === action.video.id) {
              return action.video
            }
            return video
          }),
        ],
      }
    case GET_VIDEOS:
      return state.videoList
    case SET_CURRENT_VIDEO:
      return {
        ...state,
        currentVideoId: action.id,
      }
    default:
      console.log('defauklt')
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

const setCurrentVideo = (id) => {
  return {
    type: SET_CURRENT_VIDEO,
    id,
  }
}

export { addVideo, editVideo, setCurrentVideo }
