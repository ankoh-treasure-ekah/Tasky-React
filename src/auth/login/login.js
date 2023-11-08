import React, { useEffect, useState } from 'react'
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
import { signInEmPass, login } from '../../services/users/user-service'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate();


  const [emailHelperText, setEmailHelperText] = useState('');
  const [passwordHelperText, setPasswordHelperText] = useState('');
  const [errorEmail, setEmailError] = useState(false);
  const [errorPassword, setPasswordError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    console.log('called')
    if(errorEmail || errorPassword || email=='' || password==''){
      console.log('error')
      setFormValid(false);
      return
    }

    if(firstRender == false)
      setFormValid(true);

  }, [email, password])

  //function to set the error state of an input field(errortext and input error )
  const setError = (handle ,errorMessage, error) => {
    if(handle=='email'){
      
      setEmailError(error);
      setEmailHelperText(errorMessage)
      return
    }
    if(handle == 'password') {
      setPasswordError(error)
      setPasswordHelperText(errorMessage)

    }

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
    
    setFirstRender(false)
    setEmail(value)
    //using regex to test for correct email
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //email syntax test
    {re.test(value) ? setError('email' ,'', false) : setError('email',inputErrors.invalidemail , true)}

  }

  const passwordControl = (value) => {

    setFirstRender(false)
    setPassword(value)

    let re = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/

    {value.length>=1 ? setError('password', '', false) : setError('password',inputErrors.passwordRequired , true)}

  }

  const handleSubmit = async (e) => {
    //firebase pending
    e.preventDefault();

    const response = await login({email, password})
    setEmail('');
    setPassword('');

    console.log(response)
    console.log(e.form)

    {response.state && navigate('/dashboard')}

    if(String(response.error).includes('auth/invalid-login-credentials'))
    {
  
        console.log('user does not exist', (response).err);
        alert('user does not exist');
        
        return
    }

    if(String(response.error).includes('auth/too-many-requests')) {
      alert('max try attempts reached, account locked, try again later or change your password');
    }

    console.log('nothing')
  
  }

  return (
    <React.Fragment>
      <Navbar />
      
      <div className='login-container'>
          <form className="form" onSubmit={(e) => handleSubmit(e)}>
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
              value={email}
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
              value={password}
            />

            <Button disabled={formValid ? false : true} className='submit-btn' type='submit' variant='contained' color='error'>Login</Button>
            
          </form>
      </div>
    </React.Fragment>
  )
}

export default Login
