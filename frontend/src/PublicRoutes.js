import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'
const PublicRoutes = () => {
  const cookie = document.cookie
  .split("; ")
  .find((row) => row.startsWith("thisisacookie="))
  ?.split("=")[1];
return (
    cookie ? <Navigate to='/'/> : <Outlet/>
  )
}

export default PublicRoutes;