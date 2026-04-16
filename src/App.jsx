import './App.css'
import DMD from './components/DMD'
import { DMD_MESSAGES } from './data/dmdMessages'

function App() {
  return (
    <main className="app">
      <DMD text={DMD_MESSAGES.ready} />
      {/* <DMD text={DMD_MESSAGES.go} /> */}
      {/* <DMD text={DMD_MESSAGES.gameOver} /> */}
      {/* <DMD text={DMD_MESSAGES.jackpot} /> */}
      {/* <DMD text="1200" scroll={false} /> */}
      {/* <DMD text={DMD_MESSAGES.pressStart} /> */}
      {/* <DMD text={DMD_MESSAGES.bravo} /> */}
    </main>
  )
}

export default App
