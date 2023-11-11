import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; 
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import './index.scss';
import { LocalizationProvider } from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';

const root = ReactDOM.createRoot(document.getElementById('root'));
let currentUser = false;
export let userInfo;
onAuthStateChanged(auth, user => {
  if(user) {
    currentUser = true;
    userInfo = user;
    console.log(user)
    root.render(
      <React.StrictMode>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <PrimeReactProvider>
            { <App user={user}/> }
            
          </PrimeReactProvider>
        </LocalizationProvider>
      </React.StrictMode>
    );
  }
  else {
    currentUser = 'none'
    
  }
})



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
