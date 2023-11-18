import "./styling/App.css"
import Header from './components/Header'
import Listview from "./components/Listview"
import Garden from "./components/Garden"
import { GARDEN, LISTVIEW } from "./constants"
import { useState } from 'react'

function App() {
  const [view, setView] = useState(LISTVIEW)
  const toggleView = () => setView(view === LISTVIEW ? GARDEN : LISTVIEW)

  return (
    <>
      <Header view={view} toggleView={toggleView} />
      {view === LISTVIEW ? <Listview /> : <Garden />}
    </>
  )
}

export default App
