import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import "../css/accountStyle.css";
import toast from 'react-hot-toast';
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL; 


const PopForm = ({ togglePopup }) => {
  const [formData, setFormData] = useState({
    accountId: '',
    accountType: '',
    imagesUpload1: '',
    imagesUpload2: '',
    imagesUpload3: '',
    imagesUpload4: '',
    imagesUpload5: '',
    accountPrice: '',
    accountName: '',
    accountUrl: '',
    siteAge: '',
    accountDesc: '',
    monetizationEnabled: '',
    earningMethod: '',
    SellerEmail: '',
    SellerFullName: '',
    MonthlyProfit: '',
    ProfitMargin: '',
    ProfitMultiple: '',
    RevenueMultiple: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requiredFields = [
      'accountId', 'accountType', 'accountPrice', 'accountName', 'accountUrl', 
      'siteAge',  'SellerEmail', 'SellerFullName'
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
      const response = await fetch(`${VITE_BASE_URL}/buySellList/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
      
      if (response.ok) {
        toast.success('Account created successfully');
        setFormData({
          accountId: '',
          accountType: '',
          imagesUpload1: '',
          imagesUpload2: '',
          imagesUpload3: '',
          imagesUpload4: '',
          imagesUpload5: '',
          accountPrice: '',
          accountName: '',
          accountUrl: '',
          siteAge: '',
          accountDesc: '',
          monetizationEnabled: '',
          earningMethod: '',
          SellerEmail: '',
          SellerFullName: '',
          MonthlyProfit: '',
          ProfitMargin: '',
          ProfitMultiple: '',
          RevenueMultiple: ''
        });
        togglePopup();
      } else {
        toast.error(data.message || 'Failed to create account');
      }
    } catch (error) {
      toast.error('Failed to create account');
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
        {Object.keys(formData).map(key => (
          <div className="inputYoutube" key={key}>
            <label htmlFor={key}>{key} :</label>
            <input
              type={key.includes('Email') ? 'email' : key.includes('Url') ? 'url' : 'text'}
              id={key}
              placeholder={`Enter ${key}`}
              value={formData[key]}
              onChange={handleChange}
            />
          </div>
        ))}
        <div className="inputYoutube">
          <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create'}</button>
        </div>
      </form>
    </>
  );
};

export default PopForm;
