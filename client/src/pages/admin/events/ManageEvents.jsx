import React, { useState, useEffect } from 'react';
import ManageEventCss from '../../../styles/events/ManageEvent.module.css';
import Body from '../../../components/Genral/Body';
import { ToastContainer } from 'react-toastify';
import EventCRUD from '../../../components/Genral/EventCRUD';
import GETEVENT_API from '../../../apis/generals/GetAllEvent_API';
import Cookies from 'js-cookie';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import TopBar from '../../../components/shared/TopBar';
import LeftSideBar from '../../../components/shared/LeftSideBar';
import { SearchEvent_API } from '../../../apis/admin/manage-blog/event/event_api';

let initialVal = {
  searchTitle: '',
}
let validationScheme = {
  searchTitle: Yup.string().required('Title is required'),
}

function ManageEvents() {
  const [EventData, setEventData] = useState(null);
  const [RefreshState, setRefreshState] = useState(false);

  const handleStateChange = (newState) => {
    setRefreshState(newState);
  };

  const formik = useFormik({
    initialValues: initialVal,
    validationSchema: Yup.object(validationScheme),
    onSubmit: async (values) => {
      const MatchingEvent=await SearchEvent_API(Cookies.get("jwtToken"),values);
      setEventData(MatchingEvent);
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Events = await GETEVENT_API(Cookies.get("jwtToken"));
        setEventData(Events);
      } catch (error) {
        console.error("Error fetching Events:", error);
      }
    };
    fetchData();
  }, [RefreshState]);

  return (
    <div >
    <div >
      <TopBar />
    </div>
    <div>
      <div>
        <LeftSideBar />
      </div>
      <div className={`${ManageEventCss.eventOptions}`}>
      <ToastContainer />  

        <div className="d-flex flex-column ">
          <div>
            <form onSubmit={formik.handleSubmit}>
              <div className="d-flex flex-row py-4">
                <div className={`${ManageEventCss.EventTitle}`}>
                <input
                  type="text"
                  id="searchTitle"
                  name="searchTitle"
                  onChange={formik.handleChange}
                  value={formik.values.searchTitle}
                  onBlur={formik.handleBlur}
                  className={`form-control ${ManageEventCss.EventInputTextBox}`}
                  placeholder='POST TITLE'
                />
                {formik.touched.searchTitle && formik.errors.searchTitle ? (
                  <div className="text-danger">{formik.errors.searchTitle}</div>
                ) : <div className="my-4"></div>}
                
                </div>
                  <button className={`btn ${ManageEventCss.searchButton}` }>submit</button>
                </div>
            </form>
          </div>

          <div>
            {EventData &&
              EventData.map((event) => (
                <EventCRUD
                  Event={event}
                  onUpdateState={handleStateChange}
                  currentRefreshState={RefreshState}
                />
              ))}
          </div>

        </div>
      </div>
    </div>
  </div>
  )
}

export default ManageEvents