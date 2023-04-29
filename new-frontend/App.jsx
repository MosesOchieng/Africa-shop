import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import partciles from 'particles.js'; // WORK ON THIS IMPORTS
//import DaoDashboard from './components/DaoDashboard/DaoDashboard'
import DaoMarketplace from './components/DaoMarketplace/DaoMarketplace'
// import { Card } from 'semantic-ui-react'


//*function App() {
 // const [registeredDAOs, setRegisteredDAOs] = useState([]); 
  
  //return (
   // <div className="App">
    //  <DaoDashboard 
     //   registeredDAOs={registeredDAOs}
      //  setRegisteredDAOs={setRegisteredDAOs}
    //  /> 
 //     <DaoDashboard/>
   // </div>
 // )
//}


function App() {
  const [registeredDAOs, setRegisteredDAOs] = useState([]); 
  
  return (
    <div className="App">
      <DaoMarketplace
        registeredDAOs={registeredDAOs}
        setRegisteredDAOs={setRegisteredDAOs}
      /> 
      <DaoMarketplace/>
    </div>
  )
}

export default App
