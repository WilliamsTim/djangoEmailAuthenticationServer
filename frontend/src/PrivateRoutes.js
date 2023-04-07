import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'
const PrivateRoutes = () => {
  const cookie = document.cookie
  .split("; ")
  .find((row) => row.startsWith("userAuthJwt="))
  ?.split("=")[1];
  console.log(cookie);
return (
    true ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default PrivateRoutes;
