import axios from "axios"
import { toast } from 'react-toastify'; 

const SendGoogleToken_API = async (token) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/signup/SendGoogleToken`, { token });
    return response.data.token;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast(error.response.data.message);
    } else {
      toast(error);
    }
  }
}

export default SendGoogleToken_API;
