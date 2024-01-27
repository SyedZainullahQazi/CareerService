import React, { useState, useEffect } from 'react';

import Cookies from 'js-cookie';
import GETUSER_API from '../../apis/generals/GetUser_API';
import { useAuth } from '../../contexts/authContext/AuthContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import TB from "../../styles/shared/TopBar.module.css";
import { NavLink } from 'react-router-dom';



function TopBar() {
  const [userData, setUserData] = useState(null);
  const { logout } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedUser = await GETUSER_API(Cookies.get("jwtToken"));
        setUserData(fetchedUser);
        console.log(userData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  console.log(userData);

  return (
    <div className={`${TB.TopBar} d-flex flex-row-reverse justify-content-between`}>

      <div >
        <LazyLoadImage
          alcol-3 t="Profile Photo"
          src={userData?.profilepicture}
          width={40}
          height={40}
          className={`${TB.ProfilePic}`}
        />
        <span className={`${TB.ProfileName}`}>{userData?.name}</span>
        
        <a href="#" className={`${TB.SignOut}`} onClick={() => { logout(); }}>
          <img src={`${process.env.PUBLIC_URL}/images/logout.svg`}/>
        </a>
      </div>

      {
        userData?.usertype && userData?.usertype==="admin"?
        <div>
           <NavLink to="/event-options" className={`${TB.Link}`}>
            <i className={`fa fa-plus-circle ${TB.LinkPadding}`}></i> Manage Events
          </NavLink>

          <NavLink to="/member-management" className={`${TB.Link}`}>
            <i className="fa fa-envelope fa-request"></i> Team Management
          </NavLink>
        </div>
        :
        <div className={`${TB.Title}`}>
        <p>Career Connect Society</p>
      </div>

      }
      
    </div>
    
  )
}

export default TopBar