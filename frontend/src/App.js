import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Unprotected from './Unprotected';
import Login from './Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/unprotected" element={<Unprotected />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App