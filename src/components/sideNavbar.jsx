import React, { useState } from "react";
import "../css/SideNavbar.css";
import BuySell from "./buySell";
import UserAll from "./UserAll";
import AccountSell from "./AccountSell";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { RiLogoutCircleLine } from "react-icons/ri";
import Navbar from "./navbar";
import toast from "react-hot-toast";
import BuyerCode from "./BuyerCode";
import SellerCode from "./SellerCode";
import BuyerPayment from "./BuyerPayment";
import AccountInfo from "./AccountInfo";
import CodeMatching from "./CodeMatching";
import SellerPayment from "./SellerPayment";
import DealCancel from "./DealCancel";

const SideNavbar = () => {
  const [activeSection, setActiveSection] = useState("UserAll");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleButtonClick = (section) => {
    setActiveSection(section);
  };

  const handleClickWidth = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleProfileClick = () => {
    setActiveSection("profile");
  };

  const handleSettingClick = () => {
    setActiveSection("setting");
  };
  const handleLogoutClick = () => {
    window.location.href = "/signIn";
    toast.success("You Are Logout");
  };

  return (
    <>
      <div className={`sideNavbarMain ${isCollapsed ? "collapsed" : ""}`}>
        <div className={`sideNavbar ${isCollapsed ? "collapsed" : ""}`}>
        <button
            type="button"
            onClick={() => handleButtonClick("UserAll")}
            className={activeSection === "UserAll" ? "active" : ""}
          >
            All Users
          </button>
          <button
            type="button"
            onClick={() => handleButtonClick("BuySell")}
            className={activeSection === "BuySell" ? "active" : ""}
          >
            Buy Sell
          </button>
      
          <button
            type="button"
            onClick={() => handleButtonClick("AccountSell")}
            className={activeSection === "AccountSell" ? "active" : ""}
          >
            Sell Ac
          </button>
          <button
            type="button"
            onClick={() => handleButtonClick("BuyerCode")}
            className={activeSection === "BuyerCode" ? "active" : ""}
          >
            Buyer Code
          </button>
          <button
            type="button"
            onClick={() => handleButtonClick("SellerCode")}
            className={activeSection === "SellerCode" ? "active" : ""}
          >
            Seller Code
          </button>
        
          <button
            type="button"
            onClick={() => handleButtonClick("AccountInfo")}
            className={activeSection === "AccountInfo" ? "active" : ""}
          >
            Account Info
          </button>
          <button
            type="button"
            onClick={() => handleButtonClick("CodeMatching")}
            className={activeSection === "CodeMatching" ? "active" : ""}
          >
            Code Matching
          </button>
         
          <button
            type="button"
            onClick={() => handleButtonClick("BuyerPayment")}
            className={activeSection === "BuyerPayment" ? "active" : ""}
          >
            Buyer Payment
          </button>
          <button
            type="button"
            onClick={() => handleButtonClick("SellerPayment")}
            className={activeSection === "SellerPayment" ? "active" : ""}
          >
            Seller Payment
          </button>
          <button
            type="button"
            onClick={() => handleButtonClick("DealCancel")}
            className={activeSection === "DealCancel" ? "active" : ""}
          >
            Deal Cancel
          </button>
        </div>
        <div className={`flexData ${isCollapsed ? "collapsed" : ""}`}>
          <Navbar
            onProfileClick={handleProfileClick}
            onSettingClick={handleSettingClick}
            onLogoutClick={handleLogoutClick}
          />
          <div className="iconSide" onClick={handleClickWidth}>
            {isCollapsed ? <RiLogoutCircleRLine /> : <RiLogoutCircleLine />}
          </div>

          {activeSection === "BuySell" && <BuySell />}
          {activeSection === "UserAll" && <UserAll />}
          {activeSection === "AccountSell" && <AccountSell />}
          {activeSection === "BuyerCode" && <BuyerCode />}
          {activeSection === "SellerCode" && <SellerCode />}
          {activeSection === "BuyerPayment" && <BuyerPayment />}
          {activeSection === "AccountInfo" && <AccountInfo />}
          {activeSection === "CodeMatching" && <CodeMatching />}
          {activeSection === "SellerPayment" && <SellerPayment />}
          {activeSection === "DealCancel" && <DealCancel />}
        </div>
      </div>
    </>
  );
};

export default SideNavbar;
