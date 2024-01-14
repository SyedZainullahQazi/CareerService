import React from 'react';
import SessionsCss from '../../../styles/shared/Sessions.module.css';
import Body from '../../../components/Genral/Body';
import Event from '../../../components/Forms/Event';
import { ToastContainer } from 'react-toastify';    

function ManageEvents() {
    return (
        <Body elementBody={()=><div className={`${SessionsCss.sessions}`}>
            <ToastContainer/>
          <Event/>
        </div>}/>
        );
}

export default ManageEvents