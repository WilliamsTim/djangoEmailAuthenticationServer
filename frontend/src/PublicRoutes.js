import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'
const PublicRoutes = () => {
  const cookie = document.cookie
  .split("; ")
  .find((row) => row.startsWith("userAuthJwt="))
  ?.split("=")[1];
  console.log(cookie)
return (
    false ? <Navigate to='/'/> : <Outlet/>
  )
}

export default PublicRoutes;