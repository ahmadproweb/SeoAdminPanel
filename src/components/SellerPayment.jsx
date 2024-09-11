import React, { useEffect, useState } from "react";
import "../css/table.css";
import toast from "react-hot-toast";
import { formatCoins } from "./formatMoney";
import { IoSearch } from "react-icons/io5";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL; 

function SellerPayment() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const [searchTerm, setSearchTerm] = useState(""); 


  const DataFetch = async () => {
    try {
      const response = await fetch(`${VITE_BASE_URL}/sellerPayment/all`, {
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
    item.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.accountId.toString().includes(searchTerm.toLowerCase())
  );


  return (
    <>
    <div className="searchBtn">
    <div className="inputMain">
      <input
        type="text"
        placeholder="Search by Account Name || Id "
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
          <div className="cell">Account Id</div>
          <div className="cell">Sended Amount</div>
          <div className="cell">Payment Method</div>
          <div className="cell">Account Number</div>
          <div className="cell">Account Name</div>
          <div className="cell">Created At</div>
        </div>
        {filteredData.map((item, index) => (
          <div className="row" key={index}>
            <div className="cell" >
              {item.accountId}
            </div>
            <div className="cell" >
              {formatCoins(item.sendedAmount)}
            </div>
            <div className="cell" >
              {item.paymentMethod}
            </div>
            <div className="cell" >
              {item.accountNumber}
            </div>
            <div className="cell" >
              {item.accountName}
            </div>
            <div className="cell">{new Date(item.createdAt).toLocaleDateString()}</div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default SellerPayment;
