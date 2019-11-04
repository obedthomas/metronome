import { SET_BPM, START, STOP, SET_COUNT } from 'actions/const'

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

    case SET_COUNT:
      return { ...state, count: (state.count + 1) % state.beatsPerMeasure }

    case START:
      return { ...state, playing: true, count: 0 }

    case STOP:
      return { ...state, playing: false, count: 0 }

    default:
      return state
  }
}
