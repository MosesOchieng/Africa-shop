import React, { useState } from 'react';
import './Dashboard.css'; 
import PopupModal from '../PopupModal/PopupModal';
import connectWallet from '../ConnectWallet/ConnectWallet';
import getProviderOrSigner from '../../contractInstance';
import LoadingModal from '../Loading/Loading';
import PopupDiv from '../PopupDiv/PopupDiv';
import DAO from '../DAO/DAO';
import { ethers } from 'ethers';

const DaoDashboard = ({ registeredDAOs, setRegisteredDAOs, address, setAddress }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [loadingStatement, setLoadingStatement] = useState(""); 
  const [showPopup, setShowPopup] = useState(false); 
  const [success, setSuccess] = useState(false); 
  const [error, setError] = useState(false); 
  const [showDao, setShowDao] = useState(false); 
  const [daoContent, setDaoContent] = useState(); 

  let daoName;  
  let walletAddress1; 
  let walletAddress2; 
  let description; 

  // For login
  let loginName; 
  let loginAddress; 


  const handleCloseModal = () => {
    setShowModal(false);
  };

  const submitLogin = () => {
    console.log("Login Name: ", loginName); 
    console.log("Login Address: ", loginAddress); 
  }

  const handleLogin = async () => {
    const { ethereum } = window; 
    const accounts = await ethereum.request({ method: "eth_requestAccounts" }); 
    const account = accounts[0]; 

    for (let i = 0; i < registeredDAOs.length; i++){
      const storedAddress = registeredDAOs[i][0];

      // Converting all addresses to lower case
      const lowercaseAccount = account.toLowerCase();
      const lowercaseStoredAddress = storedAddress.toLowerCase();

      if(lowercaseAccount == lowercaseStoredAddress){
        // Open up the modal containing the DAO registered with the wallet
        setShowDao(true); 
        setDaoContent(registeredDAOs[i]); 
        console.log(`Connected account ${account} matches the address ${registeredDAOs[i][0]}`)
      } else {
        console.log("Connected account does not match")
      }
    }

  }

  const submitRegister = async (event) => {
    try {
      const { farmDaoContract } = await getProviderOrSigner(true); 

      console.log("Creating the DAO..."); 
      setShowModal(false); 
      setLoading(true); 
      setLoadingStatement("Creating the DAO...")
      const tx = await farmDaoContract.createDao(
        walletAddress1, 
        walletAddress2, 
        description, 
        daoName, 
        { gasLimit: 1000000 }
      )
      console.log("Adding DAO...")
      setLoadingStatement("Adding DAO...")

      await tx.wait(); 
      setLoading(false); 
      console.log("DAO created succesfully!")

      setShowPopup(true);
      setSuccess(true) 
      setTimeout(() => {
        setShowPopup(false)
        setSuccess(false)
      }, 3000)

    } catch (error) {
      console.error(error); 

      setShowPopup(true);
      setError(true) 
      setTimeout(() => {
        setShowPopup(false); 
        setError(false)
      }, 3000)
    }

  }


  const handleShowModal = async (title) => {
    console.log("Connecting wallet...")
    const account =  await connectWallet(); 
    setAddress(account); 

    setModalTitle(title);
    if (title === "REGISTER") {
      setModalContent(
        <div className='content-container'>
          <div>
            <label>NAME</label>
            <input 
              type="text" 
              placeholder="Name" 
              name="Name"
              onChange={ (e) => {
                daoName = e.target.value
              }}
              />
          </div>
          <div>
            <label>Wallet Address 1</label>
            <input 
              type="text" 
              placeholder="Wallet Address 1" 
              name='walletAddress1'
              onChange={ (e) => {
                walletAddress1 = e.target.value
              }}
              />
          </div>
          <div>
            <label>Wallet Address 2</label>
            <input 
              type="text" 
              placeholder="Wallet Address 2" 
              name='walletAddress2'
              onChange={ (e) => {
                walletAddress2 = e.target.value
              }}
            />
          </div>
          <div>
            <label>Description</label>
            <input 
              type="text"  
              placeholder="Description" 
              name='description'  
              onChange={ (e) => {
                description = e.target.value
              }}
            />
          </div>
          <button className="close-btn" onClick={submitRegister}>
            REGISTER
          </button> 
        </div>
      );
    } else if (title === "LOG IN") {
      setModalContent(
        <div className="content-container">
          <div>
            <label>DAO Name</label>
            <input 
              type="text" 
              placeholder="DAO name" 
              name="loginName"
              onChange={ (e) => {
                loginName = e.target.value
              }}
              />
          </div>
          <div>
            <label>Wallet Address</label>
            <input 
              type="text" 
              placeholder="Wallet Address" 
              name='loginAddress'
              onChange={ (e) => {
                loginAddress = e.target.value
              }}
              />
          </div>

          <button className="close-btn" onClick={submitLogin}>
            LOGIN
          </button>
        </div>
      );
    }
    setShowModal(true);
  };

  return (
    <div className='dao-container' id="daodashboard">

      {
        showDao && (
          <DAO 
            daoContent={daoContent}
          />
        )
      }
      <LoadingModal 
        loading={loading}
        loadingStatement={loadingStatement}
      />

      <PopupDiv 
        showPopup={showPopup}
        error={error}
        succes={success}
      />

      <h1 className='dao-heading'>DAO DASHBOARD</h1>
       
      <div className='description-container'>
        <p className='dao-description'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor faucibus augue, eu 
          pellentesque libero aliquet vitae. Sed nec felis ut lacus dictum hendrerit at 
          sed lacus. Nunc id sapien vel leo aliquam semper sed eget nisi. 
          Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac 
          turpis egestas.
        </p>

        <img className="description-image" src="./farmer.jpg" />
      </div>

      <div>
        <button onClick={() => { handleShowModal("REGISTER", "This is the Register Modal Content"); connectWallet() }}>Register DAO</button>
        <button onClick={() => { handleLogin(); connectWallet() }}>Login DAO</button>
      </div>

      <PopupModal 
        handleShowModal={handleShowModal}
        handleCloseModal={handleCloseModal}
        showModal={showModal}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
      
    </div>
  );
};

export default DaoDashboard;
