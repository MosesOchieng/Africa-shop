import React from 'react';
import './Navbar.css'; // Assuming you have a separate CSS file called Navbar.css for styling

const Navbar = ({ ConnectWallet, walletConnected, setWalletConnected, setAddress , address }) => {

  const handleWalletConnect = async () => {
    console.log("Connecting wallet...."); 
    const account = await ConnectWallet(); 
    console.log("Connected account is: ", account); 
    setWalletConnected(true); 
    setAddress(account); 
  }

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
                {
                   !walletConnected ? (
                    <button className="connect-wallet-button" onClick={handleWalletConnect}>Connect Wallet</button>
                   ) : (
                    <button className="connect-wallet-button">{address.slice(0,6)}...{address.slice(38,42)}</button>
                   )
                }
            </li>
        </div>

      </ul>
    </nav>
  );
};

export default Navbar;
