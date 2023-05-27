
import React from 'react';
import { utils } from 'ethers';
import './DAO.css'; // Import the CSS file for styling


const DAO = ({ daoContent, setShowDao }) => {

    console.log("Dao content is: ", daoContent)

    return (
        <div className="login-container">

            <div className="login-form">
                <h2>{daoContent.name}</h2>
                <div className="description">
                    <p>{daoContent.description}</p>
                </div>
                <div className="invested-form">
                    <p className='descriptionArea' >Total Amount Invested</p>
                    <p className='descriptionArea' >{utils.formatEther(daoContent.amountInvested)} USD</p>
                </div>
                <div className="invested-form">
                    <div>
                        <p className='descriptionArea' >Investors</p>
                        <div  className='descriptionArZea'>
                            {daoContent.investors.map((investor) => {
                                <a href="https://sepolia.etherscan.io/" target='_blank'>{investor.slice(0,6)}...{investor.slice(38,42)}</a>
                            })}
                        </div>
                    </div>

                    <div>
                        <p className='descriptionArea' >Owners</p>
                        <div  className='descriptionArea'>
                            <a href="https://sepolia.etherscan.io/" target='_blank'>{daoContent.address1.slice(0,6)}...{daoContent.address1.slice(38,42)}</a>
                            <a href="https://sepolia.etherscan.io/" target='_blank'>{daoContent.address2.slice(0,6)}...{daoContent.address2.slice(38,42)}</a>
                        </div>
                    </div>

                </div>

                <div>
                    <button className="withdraw-button">Withdraw Funds</button>
                    <button className="exit-button" onClick={ () => setShowDao(false) }>Exit</button>
                </div>
            </div>

        </div>
    );
};

export default DAO;




