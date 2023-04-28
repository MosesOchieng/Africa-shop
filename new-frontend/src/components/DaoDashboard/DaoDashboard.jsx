import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import './Dashboard.css'; 
import PopupModal from '../PopupModal/PopupModal';

const DaoDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(""); 
  // const history = useHistory();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // const handleShowModal = () => {
  //   setShowModal(true);
  // };

  // const handleShowModal = (title, content) => {
  //   setModalTitle(title);
  //   setModalContent(content);
  //   setShowModal(true);
  // };

  // const handleShowModal = (title, content) => {
  //   setModalTitle(title);
  //   setModalContent(content);
  //   setShowModal(true);
  // };

  const handleShowModal = (title) => {
    setModalTitle(title);
    if (title === "REGISTER") {
      setModalContent(
        <div className='content-container'>
          <div>
            <label>NAME</label>
            <input type="text" placeholder="Name" />
          </div>
          <div>
            <label>Wallet Address 1</label>
            <input type="text" placeholder="Wallet Address 1" />
          </div>
          <div>
            <label>Wallet Address 2</label>
            <input type="text" placeholder="Wallet Address 2" />
          </div>
          <div>
            <label>Members</label>
            <input type="text" placeholder="Members" />
          </div>
          <div>
            <label>Description</label>
            <input type="text" placeholder="Description" />
          </div>
        </div>
      );
    } else if (title === "LOG IN") {
      setModalContent(
        <div className="content-container">
          <div>
            <label>DAO Name</label>
            <input type="text" placeholder="DAO name" />
          </div>
          <div>
            <label>Wallet Address</label>
            <input type="password" placeholder="Wallet Address" />
          </div>
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
