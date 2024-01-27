import axios from "axios";

const GETSCHOLARSHIPS_API = async (jwtToken) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
    },
  };
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/generals/getScholarships`, config)
    console.log(response.data);
    return response.data;
  }
  catch (error) {
    console.error('Error:', error);
  };
}

export default GETSCHOLARSHIPS_API;