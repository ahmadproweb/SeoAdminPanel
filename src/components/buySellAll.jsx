import React, { useState, useEffect } from 'react';
import { GrUpdate } from 'react-icons/gr';
import { MdOutlineAutoDelete } from 'react-icons/md';
import UpdateForm from './UpdateAccount';
import '../css/accountStyle.css';
import toast from 'react-hot-toast';
import { IoSearch } from "react-icons/io5";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL; 


const AllAccount = () => {
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    // try {
  const token = localStorage.getItem("token");
      const response = await fetch(`${VITE_BASE_URL}/buySellList/allAdmin`,{
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      const data = await response.json();
      setAccounts(data);
    // }
    //  catch (error) {
    //   console.error("There was an error fetching the accounts!", error);
    // }
  };

  const token = localStorage.getItem("token");

  const handleDelete = async (accountId) => {
    try {
      const response = await fetch(`${VITE_BASE_URL}/buySellList/delete/${accountId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setAccounts(accounts.filter(account => account.accountId !== accountId));
        toast.success('Account deleted successfully');
      } else {
        toast.error('Failed to delete account');
      }
    } catch (error) {
      toast.error('Failed to delete account');
    }
  };

  const toggleUpdateForm = (account) => {
    setSelectedAccount(account);
    setIsUpdateFormVisible(!isUpdateFormVisible);
  };

  const handleUpdateSuccess = () => {
    fetchAccounts();
    setIsUpdateFormVisible(false); 
  };
  const [searchTerm, setSearchTerm] = useState(""); 

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredData = accounts.filter((item) =>
    item.SellerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.accountType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.accountId.toString().includes(searchTerm)
  );

  return (
    <> 
    <div className="searchBtn">
    <div className="inputMain">
      <input
        type="text"
        placeholder="Search by Seller Email || Acc Id or Name Type"
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
            <div className="cell">Seller Email</div>
            <div className="cell">Seller FullName</div>
            <div className="cell">Account Type</div>
            <div className="cell">Account Name</div>
            <div className="cell">Account Price</div>
            <div className="cell">Account Url</div>
            <div className="cell">Site Age</div>
            <div className="cell">Account Desc</div>
            <div className="cell">Monetization Enabled</div>
            <div className="cell">Earning Method</div>
            <div className="cell">Monthly Profit</div>
            <div className="cell">Profit Margin</div>
            <div className="cell">Page Views</div>
            <div className="cell">Profit Multiple</div>
            <div className="cell">Revenue Multiple</div>
            <div className="cell">Images Upload 1</div>
            <div className="cell">Images Upload 2</div>
            <div className="cell">Images Upload 3</div>
            <div className="cell">Images Upload 4</div>
            <div className="cell">Images Upload 5</div>
            <div className="cell">Created At</div>
            <div className="cell">Update</div>
            <div className="cell">Delete</div>
          </div>
          {filteredData.map(account => (
            <div className="row" key={account.accountId}>
              <div className="cell">{account.accountId}</div>
              <div className="cell">{account.SellerEmail}</div>
              <div className="cell">{account.SellerFullName}</div>
              <div className="cell">{account.accountType}</div>
              <div className="cell">{account.accountName}</div>
              <div className="cell">{account.accountPrice}</div>
              <div className="cell">{account.accountUrl}</div>
              <div className="cell">{account.siteAge}</div>
              <div className="cell">{account.accountDesc}</div>
              <div className="cell">{account.monetizationEnabled}</div>
              <div className="cell">{account.earningMethod}</div>
              <div className="cell">{account.MonthlyProfit}</div>
              <div className="cell">{account.ProfitMargin}</div>
              <div className="cell">{account.PageViews}</div>
              <div className="cell">{account.ProfitMultiple}</div>
              <div className="cell">{account.RevenueMultiple}</div>
              <div className="cell"><a href={account.imagesUpload1}>View Image</a></div>
              <div className="cell"><a href={account.imagesUpload2}>View Image</a></div>
              <div className="cell"><a href={account.imagesUpload3}>View Image</a></div>
              <div className="cell"><a href={account.imagesUpload4}>View Image</a></div>
              <div className="cell"><a href={account.imagesUpload5}>View Image</a></div>
              <div className="cell">{new Date(account.createdAt).toLocaleDateString()}</div>
              <div className="cell Icon" onClick={() => toggleUpdateForm(account)}><GrUpdate /></div>
              <div className="cell Icon" onClick={() => handleDelete(account.accountId)}><MdOutlineAutoDelete /></div>
            </div>
          ))}
        </div>
      </div>
      {isUpdateFormVisible && selectedAccount && (
        <>
          <div className="overlay" onClick={() => toggleUpdateForm(null)}></div>
          <div className="popup">
            <UpdateForm account={selectedAccount} onClose={handleUpdateSuccess} />
          </div>
        </>
      )}
    </>
  );
};

export default AllAccount;
