import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";

import Post from '../../components/shared/Post';

import DBStyle from "../../styles/Dashboard.module.css"
import Body from '../../components/Genral/Body';
import GETSCHOLARSHIPS_API from '../../apis/generals/GetScholarships_API';

const stripHtmlTags = (htmlString) => {
  const doc = new DOMParser().parseFromString(htmlString, 'text/html');
  return doc.body.textContent || '';
};

const Scholarship = () => {
  const [EventData, setEventData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Events = await GETSCHOLARSHIPS_API(Cookies.get("jwtToken"));
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

export default Scholarship;
