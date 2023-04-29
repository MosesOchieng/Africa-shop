import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import partciles from 'particles.js'; // WORK ON THIS IMPORTS
import DaoDashboard from './components/DaoDashboard/DaoDashboard'
import ConnectWallet from './components/ConnectWallet/ConnectWallet'
import Marketplace from './components/Marketplace/Marketplace'


function App() {
  const [registeredDAOs, setRegisteredDAOs] = useState([]); 
  const [address, setAddress] = useState(); 
  
  return (
    <div className="App">
      <DaoDashboard 
        registeredDAOs={registeredDAOs}
        setRegisteredDAOs={setRegisteredDAOs}
        address={address}
        setAddress={setAddress}
      /> 
      
    </div>
  )
}

export default App
