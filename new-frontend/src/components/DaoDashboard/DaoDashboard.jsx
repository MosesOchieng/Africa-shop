import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import './Dashboard.css'; 
import PopupModal from '../PopupModal/PopupModal';

const DaoDashboard = ({ registeredDAOs, setRegisteredDAOs }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(""); 
  const [name, setName] = useState(""); 
  const [walletAddress1, setWalletAddress1] = useState(""); 
  const [walletAddress2, setWalletAddress2] = useState(""); 
  const [description, setDescription] = useState(""); 
  const [daoName, setDaoName] = useState(""); 
  const [walletAddress, setWalletAddress] = useState(""); 
  // const history = useHistory();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleRegister = (event) => {
    const { name, value } = event.target; 
    
    if (name == "Name") {
      setName(value)
    }

    if (name == "walletAddress1") {
      setWalletAddress1(value)
    }

    if (name == "walletAddress2") {
      setWalletAddress2(value)
    }

    if (name == "description") {
      setDescription(value)
    }
  }

  const handleLogin = (event) => {
    const { name, value } = event.target; 
    
    if (name == "DaoName") {
      setDaoName(value)
    }

    if (name == "walletAddress") {
      setWalletAddress(value)
    }
  }

  const submitRegister = (event) => {
    const { name, value } = event.target; 
    let daoName; 
    let walletAddressOne; 
    let walletAddressTwo; 
    let description; 

    
    if (name == "Name") {
      daoName = value; 
      console.log("Name is: ", value); 
      console.log("Name2 is: ", daoName); 
    }

    if (name == "walletAddress1") {
      walletAddressOne = value; 
    }

    if (name == "walletAddress2") {
      walletAddressTwo = value; 
    }

    if (name == "description") {
      description = value; 
      console.log("Description is: ", value); 
      console.log("Description 2 is: ", description); 
    } 

    const newDao = {
      name: daoName, 
      walletAddressOne: walletAddress1, 
      walletAddressTwo: walletAddress2, 
      description: description
    }

    setRegisteredDAOs((prevState) => [...prevState, newDao])
    setShowModal(false); 
  }

  console.log("Registered DAOs: ", registeredDAOs); 


  const handleShowModal = (title) => {
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
              onChange={handleRegister}
              />
          </div>
          <div>
            <label>Wallet Address 1</label>
            <input 
              type="text" 
              placeholder="Wallet Address 1" 
              name='walletAddress1'
              onChange={handleRegister}
              />
          </div>
          <div>
            <label>Wallet Address 2</label>
            <input 
              type="text" 
              placeholder="Wallet Address 2" 
              name='walletAddress2'
              onChange={handleRegister}
            />
          </div>
          <div>
            <label>Description</label>
            <input 
              type="text"  
              placeholder="Description" 
              name='description'  
              onChange={handleRegister}
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
              name="DaoName"
              onChange={handleLogin}
              />
          </div>
          <div>
            <label>Wallet Address</label>
            <input 
              type="text" 
              placeholder="Wallet Address" 
              name='walletAddress'
              onChange={handleLogin}
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
    <div className='dao-container'>
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
        {/* <button className='gradient-btn v2' onClick={() => handleRegister(true, false)}>Register DAO</button>
        <button className='gradient-btn v2' onClick={() => handleLogin(false, true)}>Log in DAO</button> */}
        <button onClick={() => handleShowModal("REGISTER", "This is the Register Modal Content")}>Register DAO</button>
        <button onClick={() => handleShowModal("LOG IN", "This is the Log In Modal Content")}>Log in DAO</button>
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
