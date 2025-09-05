import React, { useState, useEffect } from "react";
import "../css/SideNavbar.css";
import BuySell from "./buySell";
import UserAll from "./UserAll";
import AccountSell from "./AccountSell";
import { RiLogoutCircleRLine, RiLogoutCircleLine } from "react-icons/ri";
import Navbar from "./navbar";
import toast from "react-hot-toast";
import BuyerCode from "./BuyerCode";
import SellerCode from "./SellerCode";
import BuyerPayment from "./BuyerPayment";
import AccountInfo from "./AccountInfo";
import CodeMatching from "./CodeMatching";
import SellerPayment from "./SellerPayment";
import DealCancel from "./DealCancel";
import Scammers from "./Scammers";
import Prove from "./Prove";

const SideNavbar = () => {
  // Read from localStorage on mount, default to BuySell
  const [activeSection, setActiveSection] = useState(
    localStorage.getItem("activeSection") || "BuySell"
  );
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleButtonClick = (section) => {
    setActiveSection(section);
    localStorage.setItem("activeSection", section); // save to localStorage
  };

  const handleClickWidth = () => setIsCollapsed(!isCollapsed);

  const handleProfileClick = () => {
    setActiveSection("profile");
    localStorage.setItem("activeSection", "profile");
  };

  const handleSettingClick = () => {
    setActiveSection("setting");
    localStorage.setItem("activeSection", "setting");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("activeSection"); // clear on logout
    window.location.href = "/signIn";
    toast.success("You Are Logout");
  };

  return (
    <div className={`sideNavbarMain ${isCollapsed ? "collapsed" : ""}`}>
      <div className={`sideNavbar ${isCollapsed ? "collapsed" : ""}`}>
        <button
          type="button"
          onClick={() => handleButtonClick("BuySell")}
          className={activeSection === "BuySell" ? "active" : ""}
        >
          Buy Sell
        </button>
        <button
          type="button"
          onClick={() => handleButtonClick("Prove")}
          className={activeSection === "Prove" ? "active" : ""}
        >
          Prove
        </button>
        <button
          type="button"
          onClick={() => handleButtonClick("AccountSell")}
          className={activeSection === "AccountSell" ? "active" : ""}
        >
          Acc Sell Forms
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
        <button
          type="button"
          onClick={() => handleButtonClick("Scammers")}
          className={activeSection === "Scammers" ? "active" : ""}
        >
          Scammers
        </button>
        <button
          type="button"
          onClick={() => handleButtonClick("UserAll")}
          className={activeSection === "UserAll" ? "active" : ""}
        >
          All Users
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
        {activeSection === "Prove" && <Prove />}
        {activeSection === "UserAll" && <UserAll />}
        {activeSection === "AccountSell" && <AccountSell />}
        {activeSection === "BuyerCode" && <BuyerCode />}
        {activeSection === "SellerCode" && <SellerCode />}
        {activeSection === "BuyerPayment" && <BuyerPayment />}
        {activeSection === "AccountInfo" && <AccountInfo />}
        {activeSection === "CodeMatching" && <CodeMatching />}
        {activeSection === "SellerPayment" && <SellerPayment />}
        {activeSection === "DealCancel" && <DealCancel />}
        {activeSection === "Scammers" && <Scammers />}
      </div>
    </div>
  );
};

export default SideNavbar;
