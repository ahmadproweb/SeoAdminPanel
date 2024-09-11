import React, { useEffect, useState } from "react";
import "../css/table.css";
import toast from "react-hot-toast";
import { IoSearch } from "react-icons/io5";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

function AccountInfo() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const [searchTerm, setSearchTerm] = useState("");

  const DataFetch = async () => {
    try {
      const response = await fetch(`${VITE_BASE_URL}/accountInfo/all`, {
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
      item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="searchBtn">
        <div className="inputMain">
          <input
            type="text"
            placeholder="Search by Full Name or Email"
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
            <div className="cell">Full Name</div>
            <div className="cell">Email</div>
            <div className="cell">Admin Email</div>
            <div className="cell">Buyer Email</div>
            <div className="cell">Account Info</div>
            <div className="cell">Account Pics</div>
            <div className="cell">Created At</div>
          </div>
          {filteredData.map((item, index) => (
            <div className="row" key={index}>
              <div className="cell">{item.fullName}</div>
              <div className="cell">{item.email}</div>
              <div className="cell">{item.adminEmail}</div>
              <div className="cell">{item.buyerEmail}</div>
              <div className="cell">{item.accountInfo}</div>
              <div className="cell" data-title="Profile Image">
                <a
                  href={item.accountPic}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Image
                </a>
              </div>
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

export default AccountInfo;
