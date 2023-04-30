
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

      return account; 
  
    } catch (error) {
      console.error(error); 
    }  
  } 

export default connectWallet; 