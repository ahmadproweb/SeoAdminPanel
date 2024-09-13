import React, { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import "../css/accountStyle.css";
import { IoSearch } from "react-icons/io5";
import { MdOutlineAutoDelete } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import toast from "react-hot-toast";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const Scammers = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    sName: "",
    sContactNumber: "",
    sCountry: "",
    sAccountdeal: "",
    sDealingTime: "",
    images: [],
  });
  const [loading, setLoading] = useState(false);

  const [scammers, setScammers] = useState([]);
  const token = localStorage.getItem("token");

  const togglePopup = () => {
    setIsPopupVisible((prev) => !prev);
  };

  useEffect(() => {
    if (isPopupVisible) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isPopupVisible]);

  useEffect(() => {
    fetchScammers();
  }, []);

  const fetchScammers = async () => {
    try {
      const response = await fetch(`${VITE_BASE_URL}/scammers/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch scammers");
      }
      const data = await response.json();
      setScammers(data);
    } catch (error) {
      //   console.error('Error fetching scammers:', error);
      toast.error("Error fetching scammers");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, images: e.target.files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.images.length < 5) {
      toast.error("At least 5 images are required");
      return;
    }
    setLoading(true); // Set loading to true when submission starts

    const form = new FormData();
    form.append("sName", formData.sName);
    form.append("sContactNumber", formData.sContactNumber);
    form.append("sCountry", formData.sCountry);
    form.append("sAccountdeal", formData.sAccountdeal);
    form.append("sDealingTime", formData.sDealingTime);
    for (let i = 0; i < formData.images.length; i++) {
      form.append("images", formData.images[i]);
    }

    try {
      const response = await fetch(`${VITE_BASE_URL}/scammers/create`, {
        method: "POST",
        body: form,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to create scammer");
      }
      const result = await response.json();
      // console.log(result);
      fetchScammers();
      toast.success("Scammer created successfully");
      setFormData({
        sName: "",
        sContactNumber: "",
        sCountry: "",
        sAccountdeal: "",
        sDealingTime: "",
        images: "",
      });
    } catch (error) {
      // console.error('Error creating scammer:', error);
      toast.error("Error creating scammer");
    } finally {
      setLoading(false); // Set loading to false when submission ends
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${VITE_BASE_URL}/scammers/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete scammer");
      }
      const result = await response.json();
      //   console.log(result);
      fetchScammers();
      toast.success("Scammer deleted successfully");
    } catch (error) {
      //   console.error('Error deleting scammer:', error);
      toast.error("Error deleting scammer");
    }
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredData = scammers.filter(
    (item) =>
      item.sName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sCountry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sContactNumber.toString().includes(searchTerm)
  );
  return (
    <div className="youtube">
      <div className="searchBtn">
        <button className="btn2" onClick={togglePopup}>
          Add Account
          <IoMdAdd />
        </button>
      </div>
      {isPopupVisible && (
        <>
          <div className="overlay" onClick={togglePopup}></div>
          <div className="popup">
            <div className="youtubeFormFill">
              <h1>Fill Form</h1>
              <RxCrossCircled className="CrossIcons" onClick={togglePopup} />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="inputYoutube">
                <label>Scammer Name :</label>
                <input
                  type="text"
                  name="sName"
                  value={formData.sName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="inputYoutube">
                <label>S Contact Number :</label>
                <input
                  type="number"
                  name="sContactNumber"
                  value={formData.sContactNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="inputYoutube">
                <label>s Country :</label>
                <input
                  type="text"
                  name="sCountry"
                  value={formData.sCountry}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="inputYoutube">
                <label>s Account deal :</label>
                <input
                  type="text"
                  name="sAccountdeal"
                  value={formData.sAccountdeal}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="inputYoutube">
                <label>s Dealing Time :</label>
                <input
                  type="date"
                  name="sDealingTime"
                  value={formData.sDealingTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="inputYoutube">
                <label>Images :</label>
                <input type="file" multiple onChange={handleFileChange} />
              </div>
              <div className="inputYoutube">
                <button type="submit">
                  {loading ? "Processing..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
      <div className="searchBtn">
        <div className="inputMain">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by Name , Country | Number"
          />
          <button>
            <IoSearch />
          </button>
        </div>
      </div>
      <div className="wrapper">
        <div className="table">
          <div className="row header">
            <div className="cell">sName</div>
            <div className="cell">sContactNumber</div>
            <div className="cell">sCountry</div>
            <div className="cell">sAccountdeal</div>
            <div className="cell">sDealingTime</div>
            <div className="cell">simages</div>
            <div className="cell">Delete</div>
          </div>
          {filteredData.map((scammer) => (
            <div key={scammer._id} className="row">
              <div className="cell">{scammer.sName}</div>
              <div className="cell">{scammer.sContactNumber}</div>
              <div className="cell">{scammer.sCountry}</div>
              <div className="cell">{scammer.sAccountdeal}</div>
              <div className="cell">{scammer.sDealingTime}</div>
              <div className="cell">
                <a href={scammer.sPics[0]}>images</a>
              </div>
              <div className="cell Icon">
                <MdOutlineAutoDelete
                  onClick={() => handleDelete(scammer._id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scammers;
