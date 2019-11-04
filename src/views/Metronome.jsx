import React from 'react'
import { connect } from 'react-redux'

import { setBpm, startPlaying, stopPlaying, setCount } from 'actions/timer'

import './Metronome.css'
import click1 from 'sounds/click1.wav'
import click2 from 'sounds/click2.wav'

class Metronome extends React.Component {
  constructor(props) {
    super(props)
    this.click1 = new Audio(click1)
    this.click2 = new Audio(click2)
  }

  playClick = () => {
    const { count, beatsPerMeasure } = this.props.timer
    if (count % beatsPerMeasure === 0) {
      this.click2.play()
    } else {
      this.click1.play()
    }
    // track the beat we are on
    this.props.setCount()
  }

  handleSlider = e => {
    const {
      setBpm,
      timer: { playing },
    } = this.props
    const bpm = e.target.value

    if (playing) {
      // stop old timer and set new one
      setBpm(bpm)
      clearInterval(this.timer)
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000)
    } else {
      // update bpm
      setBpm(bpm)
    }
  }

  handleButton = () => {
    const {
      startPlaying,
      stopPlaying,
      timer: { bpm, playing },
    } = this.props

    if (!playing) {
      // Start the timer
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000)
      startPlaying()
    } else {
      // Stop the timer
      stopPlaying()
      clearInterval(this.timer)
    }
  }

  render() {
    const { bpm, playing } = this.props.timer

    return (
      <div className="metronome">
        <div className="bpm-slider">
          <div>{bpm} BPM</div>
          <input
            type="range"
            min="60"
            max="240"
            value={bpm}
            onChange={this.handleSlider}
          />
        </div>
        <button
          onClick={this.handleButton}
          className={playing ? 'red' : 'green'}
        >
          {playing ? 'Stop' : 'Start'}
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  timer: state.timer,
})

export default connect(
  mapStateToProps,
  { setBpm, startPlaying, stopPlaying, setCount }
)(Metronome)
