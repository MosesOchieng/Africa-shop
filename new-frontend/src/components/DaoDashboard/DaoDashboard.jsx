import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import './Dashboard.css'; 
import PopupModal from '../PopupModal/PopupModal';

const DaoDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  // const history = useHistory();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleRegister = (register, login) => {
    // history.push('/register');
    handleShowModal(register, login); 
  };

  const handleLogin = (register, login) => {
    // history.push('/login');
    handleShowModal(register, login); 
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
        <button className='gradient-btn v2' onClick={() => handleRegister(true, false)}>Register DAO</button>
        <button className='gradient-btn v2' onClick={() => handleLogin(false, true)}>Log in DAO</button>
      </div>

      <PopupModal 
        handleShowModal={handleShowModal}
        handleCloseModal={handleCloseModal}
        showModal={showModal}
      />
      
    </div>
  );
};

export default DaoDashboard;
