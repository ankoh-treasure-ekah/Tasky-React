import React, { useEffect } from 'react'
import './navbar.scss'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';

//contains code for our navbar and logic

const Navbar = ({user}) => {
    let userImage = "";
    let userName = "Treasure";
    let userIn = user;
    console.log(userIn);

    useEffect(() => {
        console.log(user)
    }, [])
    
    // controls the sliding of our side-drawer in smaller screen sizes
    const openDrawer = () => {
        console.log('drawer')
    }

  return (
    <nav className='navbarWorks'>
        <div className="logoNav">
            <button className='btn menu-btn' onClick={openDrawer}>
                menu
            </button>
            <h1><span id="portFolio">Tas</span>ky</h1>
        </div>
        {!userIn && <ul className="navLinks">
            <li className="navItem"><Link to="/" className="navLink">Home</Link></li>
            <li className="navItem"><a href="Contact" className="navLink">Contact</a></li>
            <li className="navItem"><a href="About" className="navLink">About</a></li>
            <li className="navItem"><a href="Portfolio" className="navLink">Portfolio</a></li>
            <li className="navItem"><a href="notification" className="navLink">notification</a></li>
        </ul>}
        
        {!userIn && <ul className="login-nav">
            <li className='login btn-nobg'><Link to="/login">Login</Link></li>
            <li className='sign-up btn-nobg'><Link to="/signup">Sign up</Link></li>
            
        </ul>}
        

        <div className="user-pane">
            <div className="userImage">
                {/* <img src={userImage} alt="user" referrerPolicy='no-referrer'/> */}
                {userImage ? <Avatar alt="Remy Sharp" src={userImage} /> : <Avatar>{user?.email.split('@')[0][0].toUpperCase()}</Avatar>}
            </div>
            {/* <button className="userImageFab">P</button> */}
            <p className="user-name">{user?.email.split('@')[0]}</p>
            <Button variant='contained'>Logout</Button>
        </div>
    </nav>
  )
}

export default Navbar
