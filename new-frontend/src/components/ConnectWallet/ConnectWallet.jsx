// import React from 'react'
// import { ethers } from 'ethers';

// const ConnectWallet = () => {
  const connectWallet = async () => { 
    console.log("Connecting wallet")
    try { 
      const { ethereum } = window; 
      
      if(typeof ethereum !== "undefined"){
        console.log("Metamask installed")
      } else {
        window.alert("Kindly install metamask")
      } 

      const accounts = await ethereum.request({ method: "eth_requestAccounts" }); 
      const account = accounts[0]; 
      const chainId = await ethereum.request({ method: "eth_chainId" });  

      console.log("Account is: ", account); 
      console.log("Chain ID is: ", chainId); 

      if (chainId != 5){
        // setGoerli(false); 
        console.log("Goerli not present!")
      }
  
    } catch (error) {
      console.error(error)
    }  
  } 
  // return (
  //   <button onClick={connectWallet}>
  //      ConnectWallet
  //   </button>
  // )
// }

export default connectWallet; 