import React, { useState, useEffect } from 'react';
import ManageEventCss from '../../../styles/events/ManageEvent.module.css';
import { ToastContainer } from 'react-toastify';
import EventCRUD from '../../../components/Genral/EventCRUD';
import Cookies from 'js-cookie';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import TopBar from '../../../components/shared/TopBar';
import LeftSideBar from '../../../components/shared/LeftSideBar';
import { GetMember_API } from '../../../apis/admin/manage-members/members_api';

let initialVal = {
  searchName: '',
}
let validationScheme = {
  searchName: Yup.string().required('Name is required'),
}

function ManageTeam() {
  const [UserData, setUserData] = useState(null);
  const [RefreshState, setRefreshState] = useState(false);

  const handleStateChange = (newState) => {
    setRefreshState(newState);
  };

  const formik = useFormik({
    initialValues: initialVal,
    validationSchema: Yup.object(validationScheme),
    onSubmit: async (values) => {
      const MatchingUser=await GetMember_API(Cookies.get("jwtToken"));
      setUserData(MatchingUser);
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const MatchingUser=await GetMember_API(Cookies.get("jwtToken"));
        console.log("----------------------------");
        console.log(MatchingUser);  
        console.log("----------------------------");
        setUserData(MatchingUser);
      } catch (error) {
        console.error("Error fetching Users:", error);
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
                  id="searchName"
                  name="searchName"
                  onChange={formik.handleChange}
                  value={formik.values.searchName}
                  onBlur={formik.handleBlur}
                  className={`form-control ${ManageEventCss.EventInputTextBox}`}
                  placeholder='Search By Name'
                />
                {formik.touched.searchName && formik.errors.searchName ? (
                  <div className="text-danger">{formik.errors.searchName}</div>
                ) : <div className="my-4"></div>}
                
                </div>
                  <button className={`btn ${ManageEventCss.searchButton}` }>submit</button>
                </div>
            </form>
          </div>

          <div>
            {UserData &&
              UserData.map((user) => (
                <EventCRUD
                  User={user}
                  onUpdateState={handleStateChange}
                  currentRefreshState={RefreshState}
                  Manageteam={true}
                />
              ))}
          </div>

        </div>
      </div>
    </div>
  </div>
  )
}

export default ManageTeam;