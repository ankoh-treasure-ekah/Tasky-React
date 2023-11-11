import React, { useEffect, useState } from 'react'
import './addTask.scss'
import  TextField  from '@mui/material/TextField'
import Button from '@mui/material/Button'
import  InputAdornment  from '@mui/material/InputAdornment'
import  IconButton  from '@mui/material/IconButton'
import {Calendar} from 'primereact/calendar'
import { DatePicker } from '@mui/x-date-pickers'
import { InputLabel, Select } from '@mui/material'
import {FormControl} from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { auth } from '../../config/firebase'
import { setFirestore } from '../../services/store/firestore'
import { userInfo } from '../../constants/userinfo';
import { onAuthStateChanged } from 'firebase/auth'
import { TaskDifficulty, TaskLevel, TaskStatus } from '../../constants/constants.enum'
import dayjs from 'dayjs'
import { Dayjs } from 'dayjs'


const AddTask = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [priority, setPriority] = useState('');
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [user, setUser] = useState(null)

    // let task = {
    //     name: '',
    //     description: '',
    //     dueDate: '',
    //     startDate: '',
    //     level: TaskLevel.NOT_STARTED,
    //     difficulty: TaskDifficult.STANDARD,
    //     status: TaskStatus.PROCESSING,
    //     userId: '',
    //     id: 0
    // }

    const [task, setTask] = useState({name: '', description: '', dueDate: '', startDate: '', level: TaskLevel.NOT_STARTED, difficulty: TaskDifficulty.MEDIUM, status: TaskStatus.PROCESSING, userId: '', id: 0})

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if(user) {
                setUser(user)
            }
            else {
                console.log("logged out")
            }
        })
    }, [])

    const handleChange = (event) => {
        setPriority(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(priority)
        
        const data = {...task, name: taskName, description: taskDescription, dueDate: dayjs(endDate).format('DD/MM/YYYY'), startDate: dayjs(startDate).format('DD/MM/YYYY'), difficulty: priority}
        const response = await setFirestore('Tasks', user?.uid, data);
        console.log(response)
        if(response.status) {
            alert('task added')
        }
    }

    const handleTaskDiffiChange = (event) => {
        setPriority(event.target.value);
    }



  return (
    <React.Fragment>
        <section className="add-task-section">
            <form onSubmit={(e) => handleSubmit(e)} className='form'>
                <TextField  
                    variant='filled'
                    id='outlined-basic'
                    label='Task Name'
                    required
                    value={taskName}
                    onChange={(e)=>setTaskName(e.target.value)}
                />
                <TextField  
                    required
                    variant='filled'
                    label='Task Description'
                    multiline
                    value={taskDescription}
                    onChange={(e) => {setTaskDescription(e.target.value)}}
                />
                <DatePicker 
                    required
                    onChange={(e) => {setStartDate(e)}}
                    value={startDate}
                    slotProps={{
                        textField: {
                            variant: 'filled',
                            label: 'Start date'
                        }
                    }}
                />
                <DatePicker 
                    required
                    onChange={(e) => {setEndDate(e)}}
                    value={endDate}
                    slotProps={{
                        textField: {
                            variant: 'filled',
                            label: 'Due date'
                        }
                    }}
                />

                <FormControl required variant='filled' sx={{minWidth: '200px'}}>

                <InputLabel id='label-for-age'>priority</InputLabel>
                <Select
                    labelId='label-for-age'
                    label='priority'
                    value={priority}
                    onChange={handleChange}
                
                >
                    <MenuItem value={TaskDifficulty.STANDARD}>{TaskDifficulty.STANDARD}</MenuItem>
                    <MenuItem value={TaskDifficulty.MEDIUM}>{TaskDifficulty.MEDIUM}</MenuItem>
                    <MenuItem value={TaskDifficulty.HIGH}>{TaskDifficulty.HIGH}</MenuItem>
                    
                </Select>
                </FormControl>

                <Button type='submit' variant='contained'>Add task</Button>
                
            </form>

        </section>
    </React.Fragment>
  )
}

export default AddTask
