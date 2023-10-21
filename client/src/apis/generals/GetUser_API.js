import axios from "axios";

const GETUSER_API = async (jwtToken) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
    },
  };
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/generals/getUser`, config)
    console.log(response.data);
    return response.data;
  }
  catch (error) {
    console.error('Error:', error);
  };
}

export default GETUSER_API;