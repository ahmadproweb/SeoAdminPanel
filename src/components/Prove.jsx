import { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import "../css/accountStyle.css";
import ProveList from "./ProveList";
import ProvePopuForm from "./ProvePopuForm";

const Prove = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [refreshList, setRefreshList] = useState(false); // trigger list refresh

  const togglePopup = () => setIsPopupVisible((prev) => !prev);

  useEffect(() => {
    if (isPopupVisible) document.body.classList.add("no-scroll");
    else document.body.classList.remove("no-scroll");

    return () => document.body.classList.remove("no-scroll");
  }, [isPopupVisible]);

  // callback to trigger refresh
  const handleRefresh = () => setRefreshList((prev) => !prev);

  return (
    <div className="youtube">
      <div className="searchBtn">
        <button className="btn2" onClick={togglePopup}>
          Add Prove
          <IoMdAdd />
        </button>
      </div>

      {isPopupVisible && (
        <>
          <div className="overlay" onClick={togglePopup}></div>
          <div className="popup">
            <ProvePopuForm togglePopup={togglePopup} onCreate={handleRefresh} />
          </div>
        </>
      )}

      <ProveList refreshTrigger={refreshList} />
    </div>
  );
};

export default Prove;
