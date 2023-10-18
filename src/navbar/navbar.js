import React from 'react'
import './navbar.scss'

//contains code for our navbar and logic

const Navbar = () => {

    let userImage = "";
    let userName = "Treasure";
    
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
        <ul className="navLinks">
            <li className="navItem"><a href="Home" className="navLink">Home</a></li>
            <li className="navItem"><a href="Contact" className="navLink">Contact</a></li>
            <li className="navItem"><a href="About" className="navLink">About</a></li>
            <li className="navItem"><a href="Portfolio" className="navLink">Portfolio</a></li>
            <li className="navItem"><a href="notification" className="navLink">notification</a></li>
        </ul>
        <ul className="login-nav">
            <li className='login btn-nobg'><a href="login">Login</a></li>
            <li className='sign-up btn-nobg'><a href="signup">Sign up</a></li>
            
        </ul>

        <div className="user-pane">
            <div className="userImage">
                <img src={userImage} alt="user" referrerPolicy='no-referrer'/>
            </div>
            <button className="userImageFab">P</button>
            <p className="user-name">{userName}</p>
            <button className="logout_btn btn">Logout</button>
        </div>
    </nav>
  )
}

export default Navbar
