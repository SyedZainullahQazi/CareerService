import React, { useEffect, useState } from 'react'
import EventCRUDCss from '../../styles/events/EventCRUD.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteEvent_API } from '../../apis/admin/manage-blog/event/event_api'
import { ApproveMember_API } from '../../apis/admin/manage-members/members_api';
import Cookies from 'js-cookie';

function EventCRUD(props) {
  const isManageMemberComponent=props?.Manageteam;

  useEffect(() => {
    console.log("-----------INSIDE THE PAGE------------");
    console.log(props);
    console.log("-----------INSIDE THE PAGE------------");
  }, [])

  const handleDelete = async () => {
    console.log("Delete Function Called");
    await DeleteEvent_API(Cookies.get("jwtToken"), props.Event._id);
    const newChildState = !props.currentRefreshState;
  
    props.onUpdateState(newChildState);
  }

  const navigate = useNavigate();

  const handleApproveMember=async ()=>{
    await ApproveMember_API(Cookies.get("jwtToken"),props.User.email_id);
    const newChildState = !props.currentRefreshState;
    props.onUpdateState(newChildState);
  }
  return (


    <div className={`${EventCRUDCss.crudStructure} `}>




      <div className="d-flex flex-row justify-content-around">
        
        <div>
          <img src={isManageMemberComponent?props.User.profilepicture:props.Event.postedBy.profilepicture} className={EventCRUDCss.profPic} />
        </div>

        <div >
          {
            isManageMemberComponent?
            <p className={`${EventCRUDCss.name}`} style={{ width: '300px' }}>Roll Num :{props.User.rollnum}</p>
            :
          <p className={`${EventCRUDCss.name}`} style={{ width: '300px' }}>Post Title :{props.Event.postTitle.slice(0, 30)}</p>
          }
        </div>

        <div>
          {
            isManageMemberComponent?
            <p className={`${EventCRUDCss.name}`}>{props.User.name}</p>
            :
          <p className={`${EventCRUDCss.name}`}>{props.Event.postedBy.name}</p>
          }
        </div>
        <div>
          <div>
            {
               isManageMemberComponent?
               <button className={`${EventCRUDCss.EventBtn}`} onClick={handleApproveMember}>
               <i className=" fa fa-pencil " style={{ color: 'green' }}></i></button>
               :
            <button className={`${EventCRUDCss.EventBtn}`} onClick={() => navigate("/update-event", { state: props.Event })}>
              <i className=" fa fa-pencil " style={{ color: 'green' }}></i></button>
            }
            </div>
          </div>
        <div>
          {
          isManageMemberComponent?
          <div></div>
          :
          <div><button className={`${EventCRUDCss.EventBtn}`} onClick={handleDelete}><i className=" fa fa-trash" style={{ color: 'red' }} ></i></button></div>
          }
        </div>
        <div>


        </div>
      </div>

    </div>

  )

}

export default EventCRUD