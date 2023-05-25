
import React from 'react';
import { utils } from 'ethers';
import './DAO.css'; // Import the CSS file for styling


const DAO = ({ daoContent, setShowDao }) => {

    console.log("Dao content is: ", daoContent)

    const descriptionText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis dapibus lectus, \
    ac fermentum erat commodo non. Vestibulum a mattis purus. Sed lacinia erat et mi mollis, \
    sed aliquet ligula elementum. Vivamus pellentesque fringilla interdum.";

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
                        <div  className='descriptionArea'>
                            <p>0x2379...4a56</p>
                            <p>0x2379...4a56</p>
                            <p>0x2379...4a56</p>
                        </div>
                    </div>

                    <div>
                        <p className='descriptionArea' >Owners</p>
                        <div  className='descriptionArea'>
                            <p>0x2379...4a56</p>
                            <p>0x2379...4a56</p>
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




