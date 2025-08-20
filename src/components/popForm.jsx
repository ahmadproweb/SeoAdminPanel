import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import "../css/accountStyle.css";
import toast from "react-hot-toast";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const PopForm = ({ togglePopup }) => {
  const [formData, setFormData] = useState({
    accountId: "",
    accountType: "",
    accountPrice: "",
    accountName: "",
    accountUrl: "",
    siteAge: "",
    accountDesc: "",
    monetizationEnabled: "",
    earningMethod: "",
    SellerEmail: "",
    SellerFullName: "",
    MonthlyProfit: "",
  });

  const [images, setImages] = useState([]); // ✅ store multiple images
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // ✅ Handle multiple image selection
  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "accountType",
      "accountPrice",
      "accountName",
      "accountUrl",
      "siteAge",
      "SellerEmail",
      "SellerFullName",
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        toast.error(`${field} is required`);
        return;
      }
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      // ✅ Use FormData instead of JSON.stringify
      const formDataToSend = new FormData();

      // append text fields
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      // append images (multiple)
      images.forEach((img) => {
        formDataToSend.append("images", img);
      });

      const response = await fetch(`${VITE_BASE_URL}/buySellList/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ don't set Content-Type manually
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Account created successfully");
        setFormData({
          accountId: "",
          accountType: "",
          accountPrice: "",
          accountName: "",
          accountUrl: "",
          siteAge: "",
          accountDesc: "",
          monetizationEnabled: "",
          earningMethod: "",
          SellerEmail: "",
          SellerFullName: "",
          MonthlyProfit: "",
        });
        setImages([]);
        togglePopup();
      } else {
        toast.error(data.message || "Failed to create account");
      }
    } catch (error) {
      toast.error("Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="youtubeFormFill">
        <h1>Fill Form</h1>
        <RxCrossCircled className="CrossIcons" onClick={togglePopup} />
      </div>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div className="inputYoutube" key={key}>
            <label htmlFor={key}>{key} :</label>
            <input
              type={
                key.includes("Email")
                  ? "email"
                  : key.includes("Url")
                  ? "url"
                  : "text"
              }
              id={key}
              placeholder={`Enter ${key}`}
              value={formData[key]}
              onChange={handleChange}
            />
          </div>
        ))}

        {/* ✅ Image upload field */}
        <div className="inputYoutube">
          <label htmlFor="images">Upload Images (max 5):</label>
          <input
            type="file"
            id="images"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className="inputYoutube">
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </>
  );
};

export default PopForm;
