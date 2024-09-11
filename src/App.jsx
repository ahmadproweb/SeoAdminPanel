import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import AdminVerify from "./components/AdminVerify";
import AdminRegister from "./components/AdminRegister";
import Home from "./components/Home";
import { Toaster } from 'react-hot-toast';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/signIn" />;
  }

  return children;
};

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path="/signIn" element={<AdminLogin />} />
          <Route path="/adminVerify" element={<AdminVerify />} />
          <Route path="/signup" element={<AdminRegister />} />
        </Routes>
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
              top: '10px'
            },
          }}
        />
      </Router>
    </>
  );
}

export default App;
