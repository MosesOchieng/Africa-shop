import React, { useState } from 'react';
import './PopupModal.css';

const PopupModal = ({ showModal, handleCloseModal, modalTitle, modalContent }) => {

  return (
    <div>
    {showModal && (
      <div className="modal">
        <div className="modal-content">
          <button className='' onClick={handleCloseModal}>
            X
          </button>
          <h2>{modalTitle}</h2>

          <div>
            {modalContent}
          </div>

          {/* <button className="close-btn" onClick={handleCloseModal}>
            Submit
          </button> */}
        </div>
      </div>
    )}
  </div>
  );
};

export default PopupModal;

// const getRegisteredDAOs = async () => {
//   const { farmDaoContract }  = await getProviderOrSigner(false); 
//   console.log("Fetching DAOs: ")
//   const allDAOs = await farmDaoContract.getAllDaos(); 
  
//   console.log("DAOs created are: ", allDAOs)
//   setRegisteredDAOs(allDAOs); 
// }

// const investDao = async (id) => {
//   try {
//     const ethAmount = 0.0001; 
//     const { farmDaoContract } = await getProviderOrSigner(true); 
//     const tx = await farmDaoContract.addInvestment(1, {
//       value: utils.parseEther(ethAmount.toString()),
//       gasLimit: 100000,
//     }); 
//     console.log("Sending funds..."); 

//     await tx.wait(); 
//     console.log("Funds sent successfully!"); 

//     getRegisteredDAOs(); 
//   } catch(error) {
//     console.error(error); 
//   }
// }
