import axios from "axios"
import { toast } from 'react-toastify'; 

const GetMember_API = async (token) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/admin/manageTeam/getMembers`,{headers: {authorization:`Bearer ${token}`,}});
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast(error.response.data.message);
    } else {
      toast(error);
    }
  }
}

const ApproveMember_API = async (token,values) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/admin/manageTeam/approveMembers`, {values},{headers: {authorization:`Bearer ${token}`,}});
    toast.success(response.data.message,{theme:"dark"} );
    return response;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast(error.response.data.message);
    } else {
      toast(error);
    }
  }
}
const SearchUser_API = async (token,values) => {
  console.log("Function Called Delete");
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/admin/event/search`, {values},{headers: {authorization:`Bearer ${token}`,}});
    console.log("----janiiii---");
    console.log(response.data);
    toast.success(response.data.message,{theme:"dark"} );
    return response.data.MatchingEvents;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast(error.response.data.message);
    } else {
      toast(error);
    }
  }
}

export  {GetMember_API,ApproveMember_API,SearchUser_API};