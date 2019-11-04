import { SET_BPM } from './const'

export const setBpm = bpm => {
  return { type: SET_BPM, payload: bpm }
}
