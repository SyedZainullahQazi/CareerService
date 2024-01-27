import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Body from '../../../components/Genral/Body';
import { ToastContainer } from 'react-toastify';
import SessionsCss from '../../../styles/shared/Sessions.module.css';
import Event from '../../../components/Forms/Event';
function UpdateEvent() {
  const location = useLocation();
  useEffect(()=>{
    console.log("post To be Updated");
    console.log(location.state);
  },[]);
  return (

    <Body elementBody={() => <div className={`${SessionsCss.sessions}`} >
      <ToastContainer />
      <Event postData={location.state} type={false}/>
    </div>} />
  )
}

export default UpdateEvent