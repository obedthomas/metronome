import { SET_BPM, START, STOP, SET_COUNT } from './const'

export const setBpm = bpm => {
  return { type: SET_BPM, payload: bpm }
}

export const startPlaying = () => {
  return { type: START, payload: true }
}

export const stopPlaying = () => {
  return { type: STOP }
}

export const setCount = () => {
  return { type: SET_COUNT }
}
