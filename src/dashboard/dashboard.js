import React, { useEffect, useState } from 'react'
import './dashboard.scss'
import Navbar from '../navbar/navbar'
import Button  from '@mui/material/Button'
import {auth} from "../config/firebase";
import { useNavigate, Outlet, Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import CircularProgress from '@mui/material/CircularProgress';


const Dashboard = () => {
  const navigate = useNavigate();
  const [uId, setUId] = useState('');
  const [user, setUser] = useState();
  const [displayLoader, setDisplayLoader] = useState(false);

  const addTasks = () => {
    navigate('addtask')
  }

  const viewTasks = () => {
    navigate('viewtask');
  }

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if(user) {
        console.log('user in', user)
        setTimeout(() => {
          setUser(user);
        }, 2000);
        // setUser(user);

      }
      else {
        console.log('logged out');
      }
    })
  }, [])

  return user ? <React.Fragment>
  <Navbar user={user}/>

  <section className="dashboard">
  
      <h1>Welcome To your Dashboard</h1>
      
      <p>Here you can view your tasks by clicking the view tasks Button on your left or 
          add a task by clicking on the add task button on your right.
      </p>
      
      <div className="task-btns">
          <Button onClick={viewTasks} variant='outlined' className="view-tasks">View Tasks</Button>
          <Button onClick={addTasks} variant='contained' className="add-task">Add Task</Button>
      </div>
      
  </section>

  <Outlet />
</React.Fragment> : <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}><CircularProgress /></div>
}

export default Dashboard
