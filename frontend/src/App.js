import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Unprotected from './Unprotected';
import Login from './Login';
import Protected from './Protected';
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes';

const App = () => {
  const cookieValue = document.cookie
  .split("; ")
  .find((row) => row.startsWith("thisisacookie="))
  ?.split("=")[1];
  console.log(cookieValue);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<Protected />} />
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/unprotected" element={<Unprotected />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App