import React, { useEffect, useState } from "react";
import "../css/table.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel CSS
import toast from "react-hot-toast";
import { IoSearch } from "react-icons/io5";
import { GiIronCross } from "react-icons/gi";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

function AccountSell() {
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const token = localStorage.getItem("token");
  const [searchTerm, setSearchTerm] = useState("");

  const DataFetch = async () => {
    try {
      const response = await fetch(`${VITE_BASE_URL}/buySell/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      setData(result);
      console.log(result);
    } catch (error) {
      toast.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    DataFetch();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleImagesClick = (images) => {
    setCurrentImages(images);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setCurrentImages([]);
  };

  const filteredData = data.filter(
    (item) =>
      item.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.accountType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Email.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <>
      <div className="searchBtn">
        <div className="inputMain">
          <input
            type="text"
            placeholder="Search by Account Name || Type or Email"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button>
            <IoSearch />
          </button>
        </div>
      </div>
      <div className="wrapper">
        <div className="table">
          <div className="row header">
            <div className="cell">Account Name</div>
            <div className="cell">Account Type</div>
            <div className="cell">Account Price</div>
            <div className="cell">Account Url</div>
            <div className="cell">Social Link1</div>
            <div className="cell">Social Link2</div>
            <div className="cell">Social Link3</div>
            <div className="cell">Social Link4</div>
            <div className="cell">Account Images</div>
            <div className="cell">Account Desc</div>
            <div className="cell">Monetization Enabled</div>
            <div className="cell">Earning Method</div>
            <div className="cell">Payment Account Verified</div>
            <div className="cell">Documents Available</div>
            <div className="cell">Email</div>
            <div className="cell">Other Email</div>
            <div className="cell">Telegram Username</div>
            <div className="cell">Contact Number</div>
            <div className="cell">Site Age</div>
            <div className="cell">Monthly Profit</div>
            <div className="cell">Profit Margin</div>
            <div className="cell">Page Views</div>
            <div className="cell">Profit Multiple</div>
            <div className="cell">Revenue Multiple</div>
            <div className="cell">createdAt</div>
          </div>
          {filteredData.map((item, index) => (
            <div className="row" key={index}>
              <div className="cell">{item.accountName}</div>
              <div className="cell">{item.accountType}</div>
              <div className="cell">{item.accountPrice}</div>
              <div className="cell">{item.accountUrl}</div>
              <div className="cell">{item.socialLink1}</div>
              <div className="cell">{item.socialLink2}</div>
              <div className="cell">{item.socialLink3}</div>
              <div className="cell">{item.socialLink4}</div>
              <div className="cell" onClick={() => handleImagesClick(item.accountImages)}>
                Images
              </div>
              <div className="cell">{item.accountDesc}</div>
              <div className="cell">{item.monetizationEnabled ? "Yes" : "No"}</div>
              <div className="cell">{item.earningMethod}</div>
              <div className="cell">{item.paymentAccountVerified ? "Yes" : "No"}</div>
              <div className="cell">{item.documentsAvailable? "Yes" : "No"}</div>
              <div className="cell">{item.Email}</div>
              <div className="cell">{item.otherEmail}</div>
              <div className="cell">{item.telegramUsername}</div>
              <div className="cell">{item.ContactNumber}</div>
              <div className="cell">{item.siteAge}</div>
              <div className="cell">{item.MonthlyProfit}</div>
              <div className="cell">{item.ProfitMargin}</div>
              <div className="cell">{item.PageViews}</div>
              <div className="cell">{item.ProfitMultiple}</div>
              <div className="cell">{item.RevenueMultiple}</div>
              <div className="cell">
                {new Date(item.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
      {showPopup && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <Carousel showThumbs={false} infiniteLoop useKeyboardArrows>
              {currentImages.map((imgUrl, imgIndex) => (
                <div key={imgIndex}>
                  <img src={imgUrl} alt={`Account Image ${imgIndex + 1}`} />
                </div>
              ))}
            </Carousel>
            <button className="close-button" onClick={handleClosePopup}><GiIronCross /></button>
          </div>
        </div>
      )}
    </>
  );
}

export default AccountSell;
