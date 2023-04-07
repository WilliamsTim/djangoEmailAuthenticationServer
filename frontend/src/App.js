import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Unprotected from './Unprotected';
import Login from './Login';
import Protected from './Protected';
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes';

const App = () => {
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