import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import partciles from 'particles.js'; // WORK ON THIS IMPORTS
import DaoDashboard from './components/DaoDashboard/DaoDashboard'
// import ConnectWallet from './components/ConnectWallet/ConnectWallet'
import DaoMarketplace from './components/DaoMarketplace/DaoMarketplace'
import { 
  BrowserRouter as Router,  
  Route,
  Routes,
  // Redirect
 } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import connectWallet from './components/ConnectWallet/ConnectWallet'


function App() {
  const [registeredDAOs, setRegisteredDAOs] = useState([]); 
  const [address, setAddress] = useState(); 
  const [walletConnected, setWalletConnected] = useState(); 
  
  return (
    <div className="App">
            <Navbar 
              ConnectWallet={connectWallet}
              walletConnected={walletConnected}
              setWalletConnected={setWalletConnected}
              setAddress={setAddress}
              address={address}
            />
            <DaoDashboard 
              registeredDAOs={registeredDAOs}
              setRegisteredDAOs={setRegisteredDAOs}
              address={address}
              setAddress={setAddress}
            /> 
            
            <DaoMarketplace  
              registeredDAOs={registeredDAOs}
              setRegisteredDAOs={setRegisteredDAOs}
            />
    </div>
  )
}

export default App
