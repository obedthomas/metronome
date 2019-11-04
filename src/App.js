import React from 'react'
import Provider from 'redux'

import store from 'store'
import Metronome from 'views/Metronome'
import 'App.css'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        Metronome
        <div>
          <Metronome />
        </div>
      </div>
    </Provider>
  )
}

export default App
