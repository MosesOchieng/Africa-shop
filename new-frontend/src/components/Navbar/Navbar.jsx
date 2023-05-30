import React from 'react';
import './Navbar.css'; // Assuming you have a separate CSS file called Navbar.css for styling

const Navbar = () => {
  return (
    <nav>
      <ul className="navbar-list">

        <li className="navbar-logo">
          <img className="navbar-logo" src="./networking.png" alt="Logo" />
        </li>
        
        <div className='navbar-items'>
            <li className="navbar-item">
              <a className="navbar-link" href="/home">Home</a>
            </li>
            <li className="navbar-item">
              <a className="navbar-link" href="/partners">Partners</a>
            </li>
            <li className="navbar-item">
              <a className="navbar-link" href="/about">About</a>
            </li>
            <li className="navbar-item">
              <a className="navbar-link" href="/marketplace">Marketplace</a>
            </li>
            <li className="navbar-item">
              <a className="navbar-link" href="/team">Team</a>
            </li>
            <li className="navbar-item">
            <button className="connect-wallet-button">Connect Wallet</button>
            </li>
        </div>

      </ul>
    </nav>
  );
};

export default Navbar;
