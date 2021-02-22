import React from 'react';
import './DataPopup.css';

const DataPopup = ({ handleClose, data }) => {
  return (
    <div className="container">
      <div
        className="popupBody"
        onClick={(e) => handleClose(e.preventDefault())}
      >
        <span onClick={handleClose}>&#x2715;</span>
        {data?.details}

        <img src={data?.links?.mission_patch} alt="" />
      </div>
    </div>
  );
};

export default DataPopup;
