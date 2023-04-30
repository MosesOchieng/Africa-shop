import React, { useState, useEffect } from "react";
import Web3 from "web3";
import FarmDAO from " ../contracts/Dex.json";

const web3 = new Web3(Web3.givenProvider);
const contractAddress = "0x123..."; // replace with the actual contract address
const contractABI = FarmDAO.abi;
const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

function App() {
  const [investAmount, setInvestAmount] = useState(0);
  const [investorsCount, setInvestorsCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const count = await contractInstance.methods.getInvestorCount().call();
      setInvestorsCount(count);
    }

    fetchData();
  }, []);

  const handleInvest = async () => {
    await contractInstance.methods.invest().send({
      from: web3.eth.currentProvider.selectedAddress,
      value: investAmount,
    });

    setInvestAmount(0);
  };

  return (
    <div className="App">
      <h1>Invest in FarmDAO</h1>
      <p>Number of investors: {investorsCount}</p>
      <label>Invest amount:</label>
      <input
        type="number"
        value={investAmount}
        onChange={(e) => setInvestAmount(e.target.value)}
      />
      <button onClick={handleInvest}>Invest</button>
    </div>
  );
}

export default App;
