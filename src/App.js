import logo from './logo.svg';
import './App.css';
import Navbar from './navbar/navbar';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import Homepage from './homepage/homepage';
import Login from './auth/login/login';
import Signup from './auth/signup/signup';
import Dashboard from './dashboard/dashboard';
import AddTask from './tasks/add-tasks/addTask';
import ViewTask from './tasks/view-task/viewTask';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' Component={Homepage} />
        <Route path='/login' Component={Login} />
        <Route path='/signup' Component={Signup} />
        <Route path='/dashboard' Component={Dashboard}>
          <Route path='addtask' Component={AddTask} />
          <Route path='viewtask' Component={ViewTask} />
        </Route>
        
      </Routes>

    </Router>

  )
}

export default App;
