import React from 'react'

import Body from '../../components/Genral/Body';

import ProfileCss from '../../styles/shared/Profile.module.css'
function Profile() {
    return (
      <Body elementBody={()=><div className={ProfileCss.profile}>
      Event</div>}/>
      );
}

export default Profile