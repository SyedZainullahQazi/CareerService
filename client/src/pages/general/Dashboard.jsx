import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/authContext/AuthContext';
import Cookies from "js-cookie";

import Post from '../../components/shared/Post';

import DBStyle from "../../styles/Dashboard.module.css"
import Body from '../../components/Genral/Body';
import GETEVENT_API from '../../apis/generals/GetAllEvent_API';

const stripHtmlTags = (htmlString) => {
  const doc = new DOMParser().parseFromString(htmlString, 'text/html');
  return doc.body.textContent || '';
};

const Dashboard = () => {
  const [EventData, setEventData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Events = await GETEVENT_API(Cookies.get("jwtToken"));
        
        const processedEvents = Events.map((event) => {
          const truncatedText = stripHtmlTags(event.postDescription).slice(0, 50);
          return { ...event, truncatedDescription: truncatedText }});

        setEventData(processedEvents);
      } catch (error) {
        console.error("Error fetching Events:", error);
      }
    };
    fetchData();
  }, []);


  return (
    <Body elementBody={() => <div className={DBStyle.dashboard}>
      {EventData&&
      <div>
        {EventData.map((event) => (
          <Post 
            title={event.postTitle} 
            body={event.truncatedDescription} 
            id={event._id} 
            userId={event.postedBy.rollnum}
            postType={event.postType}
          />
        ))}
      </div>
    }

    </div>} />
  );
}

export default Dashboard;
