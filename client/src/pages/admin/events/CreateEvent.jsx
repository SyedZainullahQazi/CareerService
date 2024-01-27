import React from 'react';
import SessionsCss from '../../../styles/shared/Sessions.module.css';
import Body from '../../../components/Genral/Body';
import Event from '../../../components/Forms/Event';
import { ToastContainer } from 'react-toastify';    

function CreateEvent() {
    return (
        <Body elementBody={()=><div className={`${SessionsCss.sessions}`}>
            <ToastContainer/>
          <Event type={true}/>
        </div>}/>
        );
}

export default CreateEvent;