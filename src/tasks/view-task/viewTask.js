import React, { useEffect, useState } from 'react'
import './viewTask.scss'
import { auth } from '../../config/firebase'
import {getDoc, getFirestore, collection, doc, setDoc, addDoc} from 'firebase/firestore'
import { getTasks } from '../../services/task/task-service'
import { userInfo } from '../../index'
import CircularProgress from '@mui/material/CircularProgress';


const ViewTask = () => {

  const [tasks, setTasks] = useState([]);
  const [showLoader, setShowLoader] = useState(true);

  useEffect( () => {
    // console.log(userInfo)
    (async () => {
      console.log('hello')

      const response = await getTasks('Tasks', userInfo.uid)
      .then((data) => {
        console.log(data)
        if(data.status) {
          for(let dataHere in data.data) {
            console.log(dataHere)
            let {[dataHere]: identifier} = data.data
            console.log(identifier)
            setTasks([...tasks, identifier])
            setShowLoader(false);
          }
        }
      })
    })()
  }, [])
  return (
    <React.Fragment>
      {showLoader ? <CircularProgress/> : <h1>HELLO </h1>}
    </React.Fragment>
  )
}

export default ViewTask
