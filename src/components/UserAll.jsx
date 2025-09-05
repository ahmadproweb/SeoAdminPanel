import React, { useEffect, useState } from "react";
import "../css/table.css";
import toast from "react-hot-toast";
import { IoSearch } from "react-icons/io5";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

function UserAll() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");
const DataFetch = async () => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/api/users/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      toast.error(`Error fetching data: ${response.status} - ${errorMsg}`);
      setData([]); // fallback to empty array
      return;
    }

    const result = await response.json();

    // Ensure result is an array
    if (Array.isArray(result)) {
      setData(result);
    } else {
      console.error("Unexpected API response:", result);
      setData([]); // prevent .filter crash
    }
  } catch (error) {
    toast.error("Error fetching data");
    console.error(error);
    setData([]); // prevent crash
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
    <div>
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
            <div className="cell">Verified</div>
            <div className="cell">Profile Image</div>
            <div className="cell">Created At</div>
            <div className="cell">Updated At</div>
          </div>
          {filteredData.map((item, index) => (
            <div className="row" key={index}>
              <div className="cell" data-title="Full Name">
                {item.fullName}
              </div>
              <div className="cell" data-title="Email">
                {item.email}
              </div>
              <div className="cell" data-title="Verified">
                {item.isVerified ? "Yes" : "No"}
              </div>
              <div className="cell" data-title="Profile Image">
                <a
                  href={item.profileImage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Image
                </a>
              </div>
              <div className="cell" data-title="Register Time">
                {item.createdAt}
              </div>
              <div className="cell">
                {new Date(item.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserAll;
