import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import partciles from 'particles.js'; // WORK ON THIS IMPORTS
import DaoDashboard from './components/DaoDashboard/DaoDashboard'


function App() {
  const [count, setCount] = useState(0)
  
  return (
    <div className="App">
      <DaoDashboard /> 
    </div>
  )
}

export default App
