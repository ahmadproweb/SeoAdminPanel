import React, { useEffect, useState } from "react";
import "../css/table.css";
import toast from "react-hot-toast";
import { IoSearch } from "react-icons/io5";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
function SellerCode() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const [searchTerm, setSearchTerm] = useState("");


  const DataFetch = async () => {
    try {
      const response = await fetch(`${VITE_BASE_URL}/codeGenerator/all/sellers`, {
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
    item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.emailAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
          <div className="cell">Full Name</div>
          <div className="cell">Email Address</div>
          <div className="cell">Buyer Name</div>
          <div className="cell">Payment For Buyer</div>
          <div className="cell">Account ID</div>
          <div className="cell">Account Type</div>
          <div className="cell">Code</div>
          <div className="cell">CreatedAt</div>
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
              {item.buyerName}
            </div>
            <div className="cell" >
              {item.paymentForBuyer}
            </div>
            <div className="cell" >
              {item.accountId}
            </div>
            <div className="cell" >
              {item.accountType}
            </div>
            <div className="cell" >
              {item.code}
            </div>
            <div className="cell">{new Date(item.createdAt).toLocaleDateString()}</div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default SellerCode;
