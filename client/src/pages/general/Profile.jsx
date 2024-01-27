import React from 'react'

import Body from '../../components/Genral/Body';

import ProfileCss from '../../styles/shared/Profile.module.css'
import ProfileCard from '../../components/Forms/ProfileCard';
import { ToastContainer } from 'react-toastify';
function Profile() {
    return (
      <Body elementBody={()=><div className={ProfileCss.profile}>
        <ToastContainer/>
        <ProfileCard/>
      </div>}/>
      );
}

export default Profile