import React, { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import "../css/accountStyle.css";
import PopForm from "./popForm";
import AllAccount from "./buySellAll";

const Youtube = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible((prev) => !prev);
  };

  useEffect(() => {
    if (isPopupVisible) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isPopupVisible]);

  return (
    <div className="youtube">
      <div className="searchBtn">

        <button className="btn2" onClick={togglePopup}>
          Add Account
          <IoMdAdd />
        </button>
      </div>
      {isPopupVisible && (
        <>
          <div className="overlay" onClick={togglePopup}></div>
          <div className="popup">
            <PopForm togglePopup={togglePopup} />
          </div>
        </>
      )}
      <AllAccount />
    </div>
  );
};

export default Youtube;
