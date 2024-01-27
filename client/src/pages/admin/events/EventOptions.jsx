import React from 'react'
import Body from '../../../components/Genral/Body';
import EventOptionsCss from '../../../styles/events/EventOptions.module.css';
import { NavLink } from 'react-router-dom';

function EventOptions() {
  return (
    <Body elementBody={()=><div className={`${EventOptionsCss.eventOptions}`}>
      <div className="d-flex flex-row justify-content-center">
        <div className={`${EventOptionsCss.optionDiv}`}>
        
        <NavLink to="/create-event " className={`${EventOptionsCss.LinkInner}`}>
          <h1><i className={`fa fa-plus-circle  fa-3x `} style={{ color: 'black' }}></i></h1>
          <p className={`${EventOptionsCss.EventText}`} style={{textDecoration:'none'}}>Create Event</p>
        </NavLink>
        </div>

        <div className={`${EventOptionsCss.optionDiv}`} style={{paddingLeft:"7.5vw",}}>
        <NavLink to="/manage-events" className={`${EventOptionsCss.LinkInner}`}>
          <h1><i className={`fa fa-cogs fa-3x  `} style={{ color: 'black' }}></i></h1>
          <p className={`${EventOptionsCss.EventText}`}>Manage Events</p>
        </NavLink>
        </div>
      </div>
    </div>}/>
    );
}

export default EventOptions