import React from 'react';
// import { useHistory } from 'react-router-dom';
import './Dashboard.css'; 

const DaoDashboard = () => {
  // const history = useHistory();

  const handleRegister = () => {
    // history.push('/register');
    console.log("Register")
  };

  const handleLogin = () => {
    // history.push('/login');
    console.log("Login")
  };

  return (
    <div className='dashboard-container'>
      <h1 className='dao-heading'>DAO DASHBOARD</h1>

      <p className='dao-description'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor faucibus augue, eu 
        pellentesque libero aliquet vitae. Sed nec felis ut lacus dictum hendrerit at 
        sed lacus. Nunc id sapien vel leo aliquam semper sed eget nisi. 
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac 
        turpis egestas.
      </p>

      <div>
        <button className='gradient-btn v2' onClick={handleRegister}>Register DAO</button>
        <button className='gradient-btn v2' onClick={handleLogin}>Log in DAO</button>
      </div>
    </div>
  );
};

export default DaoDashboard;
