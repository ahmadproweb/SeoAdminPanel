import React, { useEffect, useState } from "react";
import "../css/table.css";
import toast from "react-hot-toast";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL; 
import { IoSearch } from "react-icons/io5";


function CodeMatching() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const [searchTerm, setSearchTerm] = useState(""); 

  const DataFetch = async () => {
    try {
      const response = await fetch(`${VITE_BASE_URL}/CodeMatching/all`, {
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
  const filteredData = data.filter((item) =>
    item.accountId.toString().includes(searchTerm)
  );
  return (
    <>
    <div className="searchBtn">
    <div className="inputMain">
      <input
        type="text"
        placeholder="Search by Full Name || Id or Email"
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
          <div className="cell">Account ID</div>
          <div className="cell">Seller Code</div>
          <div className="cell">Buyer Code</div>
          <div className="cell">Created At</div>
        </div>
        {filteredData.map((item, index) => (
          <div className="row" key={index}>
            <div className="cell" >
              {item.accountId}
            </div>
            <div className="cell" >
              {item.sellerCode}
            </div>
            <div className="cell" >
              {item.buyerCode}
            </div>
            <div className="cell">{new Date(item.createdAt).toLocaleDateString()}</div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default CodeMatching;
