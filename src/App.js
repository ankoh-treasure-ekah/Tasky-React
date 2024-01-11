import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import LandingPage from './landing-page/landingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' Component={LandingPage} />
        
        
      </Routes>

    </Router>

  )
}

export default App;
