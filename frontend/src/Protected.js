import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Protected() {
  // variables
  const navigate = useNavigate();

  // functions
  function signOut() {
    const csrfToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="))
    ?.split("=")[1];
    axios.get('/api/signout', {headers: {'X-CSRFToken': csrfToken}})
      .then((val) => val.data == 'success' ? navigate('/login') : alert('there was a problem signing out, please try again later'))
      .catch((e) => alert('there was a problem signing out, please try again later'));
  }

  // component
  return (
    <div>
      <div>Home Page</div>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}

export default Protected