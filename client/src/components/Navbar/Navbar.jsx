import React , {useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component'; // Import the LazyLoadImage component
import '../../styles/Navbar.css';
import GETUSER_API from '../../apis/generals/GetUser_API';
import Cookies from 'js-cookie';
import { useAuth } from '../../contexts/authContext/AuthContext';
import NAVSTYLE from "../../styles/shared/navbar.module.css"

const Navbar = () => {
  const [userData,setUseData]=useState(null);
  const {logout}=useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedUser = await GETUSER_API(Cookies.get("jwtToken"));
        setUseData(fetchedUser);
        console.log(userData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={`${process.env.PUBLIC_URL}/images/CCS.jpg`} alt="Logo" />
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/dashboard" activeClassName={NAVSTYLE.active} exact>
            <i className={NAVSTYLE.active} ></i> Dashboard
          </NavLink>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-graduation-cap"></i> Scholarship
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-users"></i> Our Team
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-calendar"></i> Session
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-calendar-plus-o"></i> Join Event
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-user"></i> Profile
          </a>
        </li>

      </ul>
      <div className="user-profile">
        {/* LazyLoadImage to load the profile picture */}
        <LazyLoadImage
          alt="Profile Photo"
          src={userData?.profilepicture}
          width={40}
          height={40}
        />
        <span className="username">{userData?.name}</span>
        <a href="#" className="sign-out" onClick={()=>{logout();}}>
          Sign Out
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
