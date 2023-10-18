import logo from './logo.svg';
import './App.css';
import Navbar from './navbar/navbar';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import Homepage from './homepage/homepage';
import Login from './auth/login/login';
import Signup from './auth/signup/signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={Homepage} />
        <Route path='/login' Component={Login} />
        <Route path='/signup' Component={Signup} />
      </Routes>

    </Router>

  )
}

export default App;
