import React, { useState } from 'react'
import './login.scss'
import { InputText } from 'primereact/inputtext';

const Login = () => {

  const [email, setEmail] = useState('');

  return (
    <div className='login-container'>
        <form className="form">
          <span className="p-input-icon-left p-float-label">
            <i className="pi pi-inbox"></i>
            <InputText  id='email' className='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="email">email</label>
          </span>

        </form>
    </div>
  )
}

export default Login
