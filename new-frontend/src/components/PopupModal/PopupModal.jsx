import React, { useState } from 'react';
import './PopupModal.css';

const PopupModal = ({ showModal, handleCloseModal, modalTitle, modalContent }) => {

  return (
    <div>
    {showModal && (
      <div className="modal">
        <div className="modal-content">
          <h2>{modalTitle}</h2>
          <p>{modalContent}</p>
          <button className="close-btn" onClick={handleCloseModal}>
            Close
          </button>
        </div>
      </div>
    )}
  </div>
  );
};

export default PopupModal;
