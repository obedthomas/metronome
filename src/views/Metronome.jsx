import React from 'react'

import './Metronome.css'
import click1 from 'sounds/click1.wav'
import click2 from 'sounds/click2.wav'

class Metronome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bpm: 100,
      playing: false,
      count: 0,
      beatsPerMeasure: 4,
    }

    this.click1 = new Audio(click1)
    this.click2 = new Audio(click2)
  }

  playClick = () => {
    const { count, beatsPerMeasure } = this.state
    if (count % beatsPerMeasure === 0) {
      this.click2.play()
    } else {
      this.click1.play()
    }
    // track the beat we are on
    this.setState(
      state => ({
        count: (state.count + 1) % state.beatsPerMeasure,
      }),
      () => console.log(this.state.count)
    )
  }

  handleSlider = e => {
    const bpm = e.target.value
    if (this.state.playing) {
      // stop old timer and set new one
      this.setState({ bpm }, clearInterval(this.timer))
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000)
    } else {
      // update bpm
      this.setState({ bpm })
    }
  }

  handleButton = () => {
    if (!this.state.playing) {
      // Start the timer
      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000)
      this.setState(
        {
          count: 0,
          playing: true,
          // Play a click "immediately" (after setState finishes)
        },
        this.playClick
      )
    } else {
      // Stop the timer
      this.setState({ playing: false, count: 0 })
      clearInterval(this.timer)
    }
  }

  render() {
    const { bpm, playing } = this.state

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

export default Metronome
