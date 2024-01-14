import axios from "axios"
import { toast } from 'react-toastify'; 

const SendBlogPostImage_API = async (token,Image) => {
  try {
    console.log("-----------------REQUEST HEADER IMAGE");
    console.log(Image);
    console.log("-----------------REQUEST HEADER IMAGE");
    const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/admin/manage-blog/image-upload`, {Image},{headers: {authorization:`Bearer ${token}`,}});
    console.log("----janiiii---");
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast(error.response.data.message);
    } else {
      toast(error);
    }
  }
}

export default SendBlogPostImage_API;