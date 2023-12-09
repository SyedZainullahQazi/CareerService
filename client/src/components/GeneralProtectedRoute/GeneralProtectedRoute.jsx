import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import Cookies from "js-cookie";
import GETUSER_API from "../../apis/generals/GetUser_API";
import { useAuth } from "../../contexts/authContext/AuthContext";

export function GeneralProtectedRoute({ elementBody: Component }) {
  const [userDetails, setUserDetails] = useState(null);
  const { isLoggedIn } = useAuth();

  
  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedUser = await GETUSER_API(Cookies.get("jwtToken"));
        console.log(isLoggedIn);
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
      {isLoggedIn? (
        Component
      ) : (
        <Navigate to="/" replace/>
      )}
    </>
  );
}

export default GeneralProtectedRoute;
