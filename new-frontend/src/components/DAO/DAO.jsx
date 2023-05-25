
import React from 'react';
import { utils } from 'ethers';
import './DAO.css'; // Import the CSS file for styling


const DAO = ({ daoContent }) => {

    console.log("Dao content is: ", daoContent)

    const descriptionText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis dapibus lectus, \
    ac fermentum erat commodo non. Vestibulum a mattis purus. Sed lacinia erat et mi mollis, \
    sed aliquet ligula elementum. Vivamus pellentesque fringilla interdum.";

    return (
        <div className="login-container">
            <form className="login-form">
                <h2>{daoContent.name}</h2>
                <div className="description">
                    <p>{daoContent.description}</p>
                </div>
                <div className="invested-form">
                    <p className='descriptionArea' style={{ width: "150px", height: "20px" }}>Total Amount Invested</p>
                    <p className='descriptionArea' style={{ width: "150px", height: "20px" }}>{utils.formatEther(daoContent.amountInvested)}</p>
                </div>
                <div className="invested-form">
                    <p className='descriptionArea' style={{ width: "150px", height: "20px" }}>Investors</p>
                    <div  className='descriptionArea'>
                        <p  style={{ width: "150px", height: "20px" }}>0x2379...4a56</p>
                        <p>0x2379...4a56</p>
                        <p>0x2379...4a56</p>
                    </div>

                </div>
                <button className="withdraw-button">Withdraw Funds</button>
            </form>
        </div>
    );
};

export default DAO;




