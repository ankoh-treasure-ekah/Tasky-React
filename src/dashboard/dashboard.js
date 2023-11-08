import React from 'react'
import './dashboard.scss'
import Navbar from '../navbar/navbar'
import Button  from '@mui/material/Button'
import {auth} from "../config/firebase";

const Dashboard = () => {
  return (
    <React.Fragment>
        <Navbar />

        <section className="dashboard">
        
            <h1>Welcome To your Dashboard</h1>
            
            <p>Here you can view your tasks by clicking the view tasks Button on your left or 
                add a task by clicking on the add task button on your right.
            </p>
            
            <div className="task-btns">
                <Button variant='outlined' className="view-tasks">View Tasks</Button>
                <Button  variant='contained' className="add-task">Add Task</Button>
            </div>
        </section>
    </React.Fragment>
  )
}

export default Dashboard
