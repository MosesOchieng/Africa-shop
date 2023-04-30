import React, { useState, useEffect } from 'react';
import './DaoMarketplace.css';
import getProviderOrSigner from '../../contractInstance';
import PopupModal from '../PopupModal/PopupModal';
import { BigNumber, utils } from 'ethers';

function DaoMarketplace({ registeredDAOs, setRegisteredDAOs }) {
  const [showAll, setShowAll] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(""); 
  // const [investmentAmount, setInvestmentAmount] = useState(); 

  const getRegisteredDAOs = async () => {
    const { farmDaoContract }  = await getProviderOrSigner(false); 
    console.log("Fetching DAOs: ")
    const allDAOs = await farmDaoContract.getAllDaos(); 
    
    console.log("DAOs created are: ", allDAOs)
    setRegisteredDAOs(allDAOs); 
  }

  const investDao = async (investAmt, id) => {
    console.log("Sending funds...")
    try {
      const { farmDaoContract } = await getProviderOrSigner(true); 
      const tx = await farmDaoContract.addInvestment(id, {
        value: utils.parseEther(investAmt.toString()),
        gasLimit: 100000,
      }); 

      await tx.wait(); 
      console.log("Funds sent successfully!"); 

      getRegisteredDAOs(); 
    } catch(error) {
      console.error(error); 
    }
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = async (title, itemId) => {
    // console.log("Connecting wallet...")
    // const account =  await connectWallet(); 
    // setAddress(account); 
    let investmentAmount; 

    setModalTitle(title);
    if (title === "LOAN") {
      console.log("LOANNNNN")
      setModalContent(
        <div className='content-container'>
          <div>
            <label>Amount: </label>
            <input 
              type="number" 
              placeholder="Enter amount to loan" 
              name="Name"
              // onChange={handleRegister}
              />
          </div>
          
          <button className="close-btn" onClick={ () => console.log("loan dao")}>
            LOAN
          </button> 
        </div>
      );
    } else if (title === "INVEST") {
      setModalContent(
        <div className="content-container">
          <div>
            <label>Amount: </label>
            <input 
              type="number" 
              placeholder="Enter amount to invest" 
              name="DaoName"
              onChange={ (e) => {
                investmentAmount = e.target.value;  
              }}
              />
          </div>

          <button className="close-btn" onClick={ () => investDao(investmentAmount, parseInt(itemId)) }>
            INVEST
          </button>
        </div>
      );
    }
    setShowModal(true);
  }

  useEffect(() => {
    getRegisteredDAOs(); 
  }, [])

  return (

    <div className='dao-container'>
      <h1 className='dao-heading'>DAO MARKETPLACE</h1>
       
      {registeredDAOs.length > 0 &&
        <div className="card-container">
          {registeredDAOs.map((item, index) => (
            <div key={index} className="card">
              <div className="card-info">
                <h2>{item.name}</h2>
                <div>Farmer Address 1: {item.address1.slice(0,6)}...{item.address1.slice(38,42)}<br/>Farmer Address 2: {item.address2.slice(0,6)}...{item.address2.slice(38,42)}</div>
                <p>DESCRIPTION: {item.description}</p>
                <p>FUNDS INVESTED: {utils.formatEther(item.amountInvested)} ETH</p>
              </div>
              <div className="card-buttons">
                <button onClick={() => handleShowModal("LOAN", item.id.toString())}>Loan</button>
                <button onClick={() => handleShowModal("INVEST", item.id.toString())}>Invest</button>
              </div>
            </div>
          ))}
        </div>
      }

      <PopupModal 
        handleShowModal={handleShowModal}
        handleCloseModal={handleCloseModal}
        showModal={showModal}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </div>
  );
}

export default DaoMarketplace;
