import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import partciles from 'particles.js'; // WORK ON THIS IMPORTS
import DaoDashboard from './components/DaoDashboard/DaoDashboard'
import ConnectWallet from './components/ConnectWallet/ConnectWallet'


function App() {
  const [registeredDAOs, setRegisteredDAOs] = useState([]); 
  
  return (
    <div className="App">
      <DaoDashboard 
        registeredDAOs={registeredDAOs}
        setRegisteredDAOs={setRegisteredDAOs}
      /> 
      {/* <ConnectWallet />  */}
    </div>
  )
}

export default App
