import React, { useState, useEffect } from 'react';
import { BiLogOutCircle } from "react-icons/bi";
import '../css/navbar.css';

const Navbar = ({ onLogoutClick }) => {
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [admin, setAdmin] = useState({ fullName: '', email: '' });

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem('admin'));
    if (storedAdmin) {
      setAdmin(storedAdmin);
    }
  }, []);

  const toggleProfileVisibility = () => {
    setIsProfileVisible(prevState => !prevState);
  };

  const handleMouseEnter = () => {
    setIsProfileVisible(true);
  };

  const handleMouseLeave = () => {
    setIsProfileVisible(false);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    onLogoutClick();
  };

  return (
    <nav>
      <h1>admin panel</h1>
      <div className="profile" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <button type='button' onClick={toggleProfileVisibility}>
          <img src="https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg" alt="Profile" />
        </button>
        <div className={`ineerProfile ${isProfileVisible ? 'show' : ''}`}>
          <h2>{admin.fullName}</h2>
          <p>{admin.email}</p>
          <button onClick={handleLogoutClick}>logout<BiLogOutCircle className='icons'/></button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
