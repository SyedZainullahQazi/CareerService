import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/authContext/AuthContext';
import Navbar from '../../components/Navbar/Navbar'; // Update the path as needed
import Cookies from "js-cookie";

import GETUSER_API from "../../apis/generals/GetUser_API";
import TopBar from '../../components/shared/TopBar';
import LeftSideBar from '../../components/shared/LeftSideBar';

import DBStyle from "../../styles/Dashboard.module.css"

const Dashboard = () => {
  const { logout } = useAuth();
  const [userData, setUseData] = useState(null);

  return (
    <div >
      <div >
        <TopBar />
      </div>

      <div>
        <div>
          <LeftSideBar />
        </div>

        <div className={DBStyle.dashboard}>
          <p>Main Content</p>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
