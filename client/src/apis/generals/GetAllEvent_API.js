import axios from "axios";

const GETEVENT_API = async (jwtToken) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
    },
  };
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/generals/getEvent`, config)
    console.log(response.data);
    return response.data;
  }
  catch (error) {
    console.error('Error:', error);
  };
}

export default GETEVENT_API;