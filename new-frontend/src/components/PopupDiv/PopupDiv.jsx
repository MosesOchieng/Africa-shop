import React from 'react'
import './PopupDiv.css'

const PopupDiv = ({ showPopup, error, success}) => {
  return (
        showPopup && (
            <div className='popup-modal'>
                <div className='popup-container'>
                  { 
                    success && (
                        <div className='success'> 
                          SUCCESS!
                        </div>
                    ) 
                  }
                  { 
                    error && (
                        <div className='error'>
                          Sorry an error occured! Please try again
                        </div>
                    ) 
                  }
                </div>
         </div>
        )
  )
}

export default PopupDiv