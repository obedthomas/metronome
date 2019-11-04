import { SET_BPM } from 'actions/const'

const initialState = {
  bpm: 60,
  count: 0,
  measure: 4,
  playing: false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_BPM:
      return { ...state, bpm: payload }

    default:
      return state
  }
}
