import axios from "axios"
import { toast } from 'react-toastify'; 

const CreateEvent_API = async (token,values) => {
  try {
    console.log("-----------------REQUEST HEADER IMAGE");
    console.log(values);
    console.log("-----------------REQUEST HEADER IMAGE");
    const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/admin/event/create`, {values},{headers: {authorization:`Bearer ${token}`,}});
    console.log("----janiiii---");
    console.log(response.data);
    toast.success("Published Successfully",{theme:"dark"} );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast(error.response.data.message);
    } else {
      toast(error);
    }
  }
}

export default CreateEvent_API;