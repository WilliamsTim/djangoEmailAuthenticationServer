import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import './styles/login.css';

function Login() {
  const [loginView, setLoginView] = useState(true);
  return (
    <div id="login">
      <div id='logincontainer'>
        {loginView ? <LoginForm toggle={() => {return setLoginView(false)}}/> : <SignUpForm toggle={() => {return setLoginView(true)}}/>}
      </div>
    </div>
  )
}

function LoginForm({toggle}) {
  // variable declarations
  // React hooks
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const loginRef = useRef(null);

  // other variables
  const white = {color: 'white'};

  //function declarations
  function validateEmail(email) {
    if (email.includes('@') && email.includes('.')) {
      setEmailError(false);
      return true;
    } else {
      setEmailError(true)
      return false;
    }
  }

  function validatePassword(passwd) {
    if (passwd.length > 5) {
      setPassError(false);
      return true
    } else {
      setPassError(true);
      return false;
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    // validate form fields before submitting
    if (validateEmail(loginRef.current[0].value) && validatePassword(loginRef.current[1].value)) {
      console.log('validated, sending to backend')
    } else {
      console.log('failed validation');
    }
    
  }

  // returned component
  return(
    <div>
      <Typography style={{textAlign: 'center'}}>Login</Typography>
      <form ref={loginRef} onSubmit={handleSubmit}>
      <TextField label="Email" variant="filled" className='formitem' error={emailError} helperText={emailError ? 'Please enter a valid email' : ''} sx={{ input: white }} InputLabelProps={{style: white}}/>
      <TextField label="Password" variant="filled" className='formitem' error={passError} helperText={passError ? 'Minimum 6 characters' : ''} sx={{ input: white }} InputLabelProps={{style: white}}/>
      <Button variant="contained" type='submit'>Login</Button>
      </form>
      <div className='bottomdiv'>
        <Typography>or</Typography>
        <Button variant="contained" onClick={toggle}>Sign Up</Button>
      </div>
    </div>
  )
}

function SignUpForm({toggle}) {
  // variable declarations
  // React hooks
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const signUpRef = useRef(null);

  // other variables
  const white = {color: 'white'};

  //function declarations
  function validateEmail(email) {
    if (email.includes('@') && email.includes('.')) {
      setEmailError(false);
      return true;
    } else {
      setEmailError(true)
      return false;
    }
  }

  function validatePassword(passwd) {
    if (passwd.length > 5) {
      setPassError(false);
      return true
    } else {
      setPassError(true);
      return false;
    }
  }

  function validateName(name) {
    if (name.length > 0) {
      setNameError(false);
      return true
    } else {
      setNameError(true);
      return false;
    }
  }


  function handleSubmit(e) {
    e.preventDefault()
    if (validateName(signUpRef.current[0].value) && validateEmail(signUpRef.current[1].value) && validatePassword(signUpRef.current[2].value)) {
      // send to backend
    } else {
      // dont
    }
  }
  // returned component
  return(
    <div>
      <Typography style={{textAlign: 'center'}}>Sign Up</Typography>
      <form onSubmit={handleSubmit} ref={signUpRef}>
        <TextField label="Name" type="text" variant="filled" className='formitem' error={nameError} helperText={nameError ? 'Please enter your name' : ''} sx={{ input: white }} InputLabelProps={{style: white}}/>
        <TextField label="Email" type="email" variant="filled" className='formitem' error={emailError} helperText={emailError ? 'Please enter a valid email' : ''} sx={{ input: white }} InputLabelProps={{style: white}}/>
        <TextField label="Password" type="password" variant="filled" className='formitem' error={passError} helperText={passError ? 'Minimum 6 characters' : ''} sx={{ input: white }} InputLabelProps={{style: white}}/>
        <Button variant="contained" type="submit">Sign Up</Button>
      </form>
      <div className='bottomdiv'>
        <Typography>or</Typography>
        <Button variant="contained" onClick={toggle}>Go Back</Button>
      </div>
    </div>
  )
}

export default Login