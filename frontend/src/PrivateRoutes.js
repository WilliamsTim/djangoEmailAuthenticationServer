import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'
const PrivateRoutes = () => {
  const cookie = document.cookie
  .split("; ")
  .find((row) => row.startsWith("userAuth="))
  ?.split("=")[1];
return (
    cookie ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default PrivateRoutes;
