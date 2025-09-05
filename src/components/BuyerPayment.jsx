import React, { useEffect, useState } from "react";
import "../css/table.css";
import toast from "react-hot-toast";
import { formatCoins } from "./formatMoney";
import { IoSearch } from "react-icons/io5";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

function BuyerPayment() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const [searchTerm, setSearchTerm] = useState(""); 


  const DataFetch = async () => {
    try {
      const response = await fetch(`${VITE_BASE_URL}/stripe/allUsers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      setData(result);
      // console.log(result);
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
    item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.emailAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.accountId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.accountType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <div className="searchBtn">
    <div className="inputMain">
      <input
        type="text"
        placeholder="Search by Full Name || Id , Type Email"
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
          <div className="cell">Seller Email</div>
          <div className="cell">Id</div>
          <div className="cell">Type</div>
          <div className="cell">Name</div>
          <div className="cell">Price</div>
          <div className="cell">Tax</div>
          <div className="cell">Cents</div>
          <div className="cell">Address</div>
          <div className="cell">Country</div>
          <div className="cell">Created At</div>
        </div>
        {filteredData.map((item, index) => (
          <div className="row" key={index}>
            <div className="cell" >
              {item.fullName}
            </div>
            <div className="cell" >
              {item.emailAddress}
            </div>
            <div className="cell" >
              {item.sellerEmail}
            </div>
            <div className="cell" >
              {item.accountId}
            </div>
            <div className="cell" >
              {item.accountType}
            </div>
            <div className="cell" >
              {item.accountName}
            </div>
            <div className="cell" >
              {formatCoins(item.accountPrice)}
            </div>
            <div className="cell" >
              {formatCoins(item.totalPrice)}
            </div>
            <div className="cell" >
              {item.amount}
            </div>
            <div className="cell" >
              {item.address}
            </div>
            <div className="cell" >
              {item.country}
            </div>
            <div className="cell">{new Date(item.createdAt).toLocaleDateString()}</div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default BuyerPayment;
