import React, { useEffect, useState } from 'react'
import Navbar from '../../navbar/navbar'
import './signup.scss'
import { InputAdornment, TextField } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { AccountCircleOutlined, AccountCircleRounded } from '@mui/icons-material'
import KeyIcon from '@mui/icons-material/Key';
import EmailIcon from '@mui/icons-material/Email';
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {inputErrors} from '../../constants/constants.enum'



const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [emailHelperText, setEmailHelperText] = useState('');
  const [errorEmail, setEmailError] = useState(false);

  const [errorPassword, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState('');
  const [password, setPassword] = useState('');

  const [errorUsername, setUsernameError] = useState(false);
  const [usernameHelperText, setUsernameText] = useState('');
  const [username, setUsername] = useState('');

  const generatePass = () => {
    let pass = ''
    let strAlpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let strNum = '0123456789';
    let strSmall = 'abcdefghijklmnopqrstuvwxyz' 
    
     for (let i = 1; i <= 5; i++) {
        var char = Math.floor(Math.random() * strAlpha.length + 1);
        pass += strAlpha.charAt(char)
        var char = Math.floor(Math.random() * strSmall.length + 1);
        pass += strSmall.charAt(char)
        var char = Math.floor(Math.random() * strNum.length + 1);
        pass += strNum.charAt(char)

      }

      console.log(pass)
      passwordControl(pass)
      return
  }

  //handle input password visibility toggle
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

   //function to set the error state of an input field(errortext and input error )
   const setError = (handle ,errorMessage, error) => {
    if(handle=='email'){
      
      setEmailError(error);
      setEmailHelperText(errorMessage)
      return
    }

    if(handle=='username'){
      setUsernameError(error);
      setUsernameText(errorMessage)
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

    if(target=='username') {
      {username.length<1 ? setError('username',inputErrors.usernameRequired, true) : setError('username','', false)}
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

  //making sure password meets a specific requirements
  const passwordControl = (value) => {

    setPassword(value)

    let re = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/

    {re.test(value) ? setError('', false) : setError('password',inputErrors.invalidPassword , true)}

  }

  //making sure user inputs a username and in future checking if it already exists
  const usernameControl = (value) => {
    setUsername(value)
    console.log(value, username)
    

    {value.length<1 ? setError('username',inputErrors.usernameRequired, true) : setError('username','', false)}
  }

  

  const handleSubmit = () => {
    //firebase pending
  }
  // useEffect(() => {
  //   console.log(username, 'from useeff')
  // }, [username])
  

  return (
    <React.Fragment>
      <Navbar />

      <div className="signup-container">
        <form className="form">

          <TextField 
            variant='filled'
            label='username'
            value={username}
            onChange={(e) => usernameControl(e.target.value)}
            id='username'
            required
            name='username'
            error={errorUsername}
            helperText={usernameHelperText}
            onBlur={(e) => focusCheck(e, 'username')}
            style={{width: '70%'}}
            InputProps={{
              endAdornment: (<InputAdornment position='end'><AccountCircle /></InputAdornment>)
            }}
          />
          <TextField 
            variant='filled'
            label='email'
            value={email}
            required
            error={errorEmail}
            helperText={emailHelperText}
            onBlur={(e) => focusCheck(e, 'email')}
            onChange={(e) => emailControl(e.target.value)}
            style={{width: '70%'}}
            id='email'
            name='email'
            InputProps={{
              endAdornment: (<InputAdornment position='end'><EmailIcon /></InputAdornment>)
            }}
          />
          <TextField 
            variant='filled'
            label='password'
            id='password'
            required
            error={errorPassword}
            helperText={passwordHelperText}
            onBlur={(e) => focusCheck(e, 'password')}
            name='password'
            value={password}
            onChange={(e) => passwordControl(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            style={{width: '70%'}}
            InputProps={{
              endAdornment: (<InputAdornment position='end'>
                                <IconButton 
                                  onClick={handlePasswordVisibility}>
                                  {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                                  </IconButton>
                                  <IconButton 
                                    onClick={generatePass}
                                    style={{marginRight: '-0.5rem'}}>
                                    <KeyIcon />
                                  </IconButton>
                              </InputAdornment>
                            )
            }}
          />

          <Button className='submit-btn' type='submit' variant='contained'>Sign up</Button>
        </form>
      </div>
    </React.Fragment>
  )
}

export default Signup
