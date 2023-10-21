import React,{useEffect,useState} from 'react';
import { useAuth } from '../../contexts/authContext/AuthContext';
import Navbar from '../../components/Navbar/Navbar'; // Update the path as needed
import Cookies from "js-cookie";

import GETUSER_API from "../../apis/generals/GetUser_API";

const Dashboard = () => {
  const { logout } = useAuth();
  const [userData,setUseData]=useState(null);

  return (
    <div className="dashboard-container">
      <div>
        <Navbar />
      </div>
      <div className="content">
        <button className="signout-button" onClick={logout}>
          Signout
        </button>
        <h1 className="dashboard-title">Hello, User</h1>
        <p>Welcome to your dashboard. Here's some content.</p>
        {/* Other content goes here */}
      </div>
    </div>
  );
}

export default Dashboard;
