import axios from "axios"
import { toast } from 'react-toastify'; 

const UpdateProfile_API = async (token,values) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/generals/update-profile`, {values},{headers: {authorization:`Bearer ${token}`,}});
      toast.success("Published Successfully",{theme:"dark"} );
      return response;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast(error.response.data.message);
      } else {
        toast(error);
      }
    }
  }

  export default UpdateProfile_API;