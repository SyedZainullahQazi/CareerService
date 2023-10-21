import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import Cookies from "js-cookie";
import { useAuth } from "../../contexts/authContext/AuthContext";
import GETUSER_API from "../../apis/generals/GetUser_API";



export function AdminProtectedRoute({ elementBody: Component }) {
  const [userDetails, setUserDetails] = useState(null);
  const { isLoggedIn } = useAuth();

  
  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedUser = await GETUSER_API(Cookies.get("jwtToken"));
        setUserDetails(fetchedUser);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  if (!userDetails && isLoggedIn) {
    return <div>Loading.....</div>;
  }

  return (
    <>
      {isLoggedIn && userDetails.usertype === "admin" ? (
        Component
      ) : (
        <Navigate to="/" replace/>
      )}
    </>
  );
}

export default AdminProtectedRoute;
