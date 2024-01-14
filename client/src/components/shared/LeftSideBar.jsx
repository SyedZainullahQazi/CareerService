import React from 'react'
import { useLocation } from 'react-router-dom';

import { NavLink } from 'react-router-dom';
import LSB from '../../styles/shared/LeftSideBar.module.css';
const activeLink = (isActive) => ({
  div : {
    backgroundColor:isActive?"orange":"white",
  }
});
function LeftSideBar() {
  const location=useLocation();
  const {pathname}=location;
  console.log(pathname);

  return (

    <div className={`d-flex flex-column ${LSB.LeftSideBar} align-items-center`}>
      <div >
        <img className={`${LSB.Logo}`} src={`${process.env.PUBLIC_URL}/images/CCS.jpg`} alt="Logo" />
        <p className={`${LSB.Title}`}>Career Connect </p>
      </div>

      <div>
        <p className={`${LSB.PunchLine}`}>Connecting You to Future</p>
      </div>

      <nav >

        <div className={`${pathname.toLowerCase().includes("/dashboard")?LSB.active:LSB.Link}` } >
          <NavLink exact to="/dashboard" className={`${LSB.LinkInner}`} style={(isActive)=>activeLink(isActive)}>
            <i className={`fa fa-tachometer ${LSB.navicon} ${LSB.tachometer}`} ></i>
            Dashboard
          </NavLink>
        </div>

        <div className={`${pathname.toLowerCase().includes("/scholarship")?LSB.active:LSB.Link}` }>
          <NavLink exact to="/scholarship" className={`${LSB.LinkInner}`}>
            <i className={`fa fa-graduation-cap ${LSB.navicon}`}></i> Scholarship
          </NavLink>
        </div>

        

        <div className={`${pathname.toLowerCase().includes("/sessions")?LSB.active:LSB.Link}` }>
          <NavLink to="/sessions" className={`${LSB.LinkInner}`}>
            <i className={`fa fa-calendar ${LSB.navicon}`}></i> Sessions
          </NavLink>
        </div>

        <div className={`${pathname.toLowerCase().includes("/team")?LSB.active:LSB.Link}` }>
          <NavLink to="/team" className={`${LSB.LinkInner}`}>
            <i className={`fa fa-users ${LSB.navicon}`}></i> Our Team
          </NavLink>
        </div>

        <div className={`${pathname.toLowerCase().includes("/join-event")?LSB.active:LSB.Link}` }>
          <NavLink to="/join-event " className={`${LSB.LinkInner}`}>
            <i className={`fa fa-calendar-plus-o ${LSB.navicon}`}></i> Join Event
          </NavLink>
        </div>

        <div className={`${pathname.toLowerCase().includes("/profile")?LSB.active:LSB.Link}` }>
          <NavLink to="/profile" className={`${LSB.LinkInner}`}>
            <i className={`fa fa-user  ${LSB.navicon} ${LSB.usericon}`}></i> 
            Profile
          </NavLink>
        </div>

      </nav>
    </div>
  )
}

export default LeftSideBar