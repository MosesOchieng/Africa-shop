import React, { useState } from 'react';
import './PopupModal.css';

const PopupModal = ({ handleShowModal, handleCloseModal, showModal }) => {

  return (
    <div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>This is the Modal Title</h2>
            <p>This is the Modal Content</p>
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
