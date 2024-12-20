import React, { useEffect, useState } from "react";
import "../css/table.css";
import toast from "react-hot-toast";
import { IoSearch } from "react-icons/io5";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

function AccountSell() {
  const [data, setData] = useState([]);
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
              <div className="cell" data-title="Profile Image">
                <a
                  href={item.accountImages}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Image
                </a>
              </div>
              <div className="cell">{item.accountDesc}</div>
              <div className="cell">{item.monetizationEnabled}</div>
              <div className="cell">{item.earningMethod}</div>
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
    </>
  );
}

export default AccountSell;
