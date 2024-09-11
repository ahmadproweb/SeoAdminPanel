import React, { useState, useEffect } from "react";
import { RxCrossCircled } from "react-icons/rx";
import "../css/accountStyle.css";
import toast from 'react-hot-toast';
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL; 

const UpdateForm = ({ account, onClose }) => {
  const [formData, setFormData] = useState({
    accountId: account?.accountId || '',
    accountType: account?.accountType || '',
    imagesUpload1: account?.imagesUpload1 || '',
    imagesUpload2: account?.imagesUpload2 || '',
    imagesUpload3: account?.imagesUpload3 || '',
    imagesUpload4: account?.imagesUpload4 || '',
    imagesUpload5: account?.imagesUpload5 || '',
    accountPrice: account?.accountPrice || '',
    accountName: account?.accountName || '',
    accountUrl: account?.accountUrl || '',
    siteAge: account?.siteAge || '',
    accountDesc: account?.accountDesc || '',
    monetizationEnabled: account?.monetizationEnabled || '',
    earningMethod: account?.earningMethod || '',
    SellerEmail: account?.SellerEmail || '',
    SellerFullName: account?.SellerFullName || '',
    MonthlyProfit: account?.MonthlyProfit || '',
    ProfitMargin: account?.ProfitMargin || '',
    PageViews: account?.PageViews || '',
    ProfitMultiple: account?.ProfitMultiple || '',
    RevenueMultiple: account?.RevenueMultiple || ''
  });

  useEffect(() => {
    if (account) {
      setFormData(prevData => ({
        ...prevData,
        ...account
      }));
    }
  }, [account]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!account || !account.accountId) {
      toast.error('Account ID is missing');
      return;
    }

    const updateData = {
      accountType: formData.accountType,
      imagesUpload1: formData.imagesUpload1,
      imagesUpload2: formData.imagesUpload2,
      imagesUpload3: formData.imagesUpload3,
      imagesUpload4: formData.imagesUpload4,
      imagesUpload5: formData.imagesUpload5,
      accountPrice: formData.accountPrice,
      accountName: formData.accountName,
      accountUrl: formData.accountUrl,
      siteAge: formData.siteAge,
      accountDesc: formData.accountDesc,
      monetizationEnabled: formData.monetizationEnabled,
      earningMethod: formData.earningMethod,
      SellerEmail: formData.SellerEmail,
      SellerFullName: formData.SellerFullName,
      MonthlyProfit: formData.MonthlyProfit,
      ProfitMargin: formData.ProfitMargin,
      PageViews: formData.PageViews,
      ProfitMultiple: formData.ProfitMultiple,
      RevenueMultiple: formData.RevenueMultiple
    };

    try {
      const response = await fetch(`${VITE_BASE_URL}/buySellList/update/${formData.accountId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Account updated successfully');
        onClose(); 
      } else {
        toast.error(result.message || 'Failed to update account');
      }
    } catch (error) {
      toast.error('Failed to update account');
    }
  };

  return (
    <>
      <div className="youtubeFormFill">
        <h1>Update Account</h1>
        <RxCrossCircled className="CrossIcons" onClick={onClose} />
      </div>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map(key => (
          !['_id', 'updatedAt', 'createdAt', '__v'].includes(key) && (
            <div className="inputYoutube" key={key}>
              <label htmlFor={key}>{key} :</label>
              <input
                type={key.includes('Email') ? 'email' : key.includes('Url') ? 'url' : 'text'}
                id={key}
                placeholder={`Enter ${key}`}
                value={formData[key]}
                onChange={handleChange}
                required
                disabled={key === 'accountId'}  
              />
            </div>
          )
        ))}
        <div className="inputYoutube">
          <button type="submit">Update</button>
        </div>
      </form>
    </>
  );
};

export default UpdateForm;
