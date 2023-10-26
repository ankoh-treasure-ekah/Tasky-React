import React, { useState } from 'react'
import './login.scss'
import { InputText } from 'primereact/inputtext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Navbar from '../../navbar/navbar';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import IconButton from '@mui/material/IconButton';
import {inputErrors} from '../../constants/constants.enum'

const Login = () => {

  const [emailHelperText, setEmailHelperText] = useState('');
  const [passwordHelperText, setPasswordHelperText] = useState('');
  const [errorEmail, setEmailError] = useState(false);
  const [errorPassword, setPasswordError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //handles when the user leaves the input field without putting in correct value
  // const inputErrors = {
  //   emailRequired: 'email required',
  //   passwordRequired: 'password required',
  //   invalidemail: 'invalid email',
  //   invalidPassword: 'Password must be a combination of lower-case, upper-case, numbers and at least 9 characters long'

  // }

  //function to set the error state of an input field(errortext and input error )
  const setError = (handle ,errorMessage, error) => {
    if(handle=='email'){
      
      setEmailError(error);
      setEmailHelperText(errorMessage)
      return
    }
    setPasswordError(error)
    setPasswordHelperText(errorMessage)

  }

  //used to check for input values when user leaves the input(onblur)
  const focusCheck = (e, target) => {
    
    if(target=='email') {
      {email.length<1 && setError('email',inputErrors.emailRequired, true)}
    }

    if(target=='password') {
      {password.length<1 && setError('password',inputErrors.passwordRequired, true)}
    }
  
  }

  //control and validate my email input for correct values
  const emailControl = (value) => {
    
    setEmail(value)

    //using regex to test for correct email
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //email syntax test
    {re.test(value) ? setError('email' ,'', false) : setError('email',inputErrors.invalidemail , true)}

  }

  const passwordControl = (value) => {

    setPassword(value)

    let re = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/

    {re.test(value) ? setError('', false) : setError('password',inputErrors.invalidPassword , true)}

  }

  const handleSubmit = () => {
    //firebase pending
  }

  return (
    <React.Fragment>
      <Navbar />
      
      <div className='login-container'>
          <form className="form" onSubmit={handleSubmit}>
            <TextField 
              InputProps={{
                endAdornment: (<InputAdornment position='end'><AccountCircle /></InputAdornment>),
              }}
              onChange={(e) => emailControl(e.target.value)} 
              // onFocus={(e) => focusCheck(e)}
              onBlur={(e) => focusCheck(e, 'email')}
              helperText={emailHelperText} 
              error={errorEmail} 
              required 
              id="outlined-basic" 
              label="email" 
              variant="filled" 
              style={{width: '70%'}}
            />

            <TextField 
              InputProps={{
                endAdornment: (<InputAdornment position='end'><KeyIcon/></InputAdornment>)
              }}
              onBlur={(e) => focusCheck(e, 'password')}
              onChange={(e) => passwordControl(e.target.value)} 
              helperText={passwordHelperText} 
              error={errorPassword} 
              required 
              id="outlined-basic" 
              label="password" 
              variant="filled" 
              style={{width: '70%'}}
            />

            <Button disabled className='submit-btn' type='submit' variant='contained' color='error'>Submit</Button>
            
          </form>
      </div>
    </React.Fragment>
  )
}

export default Login
