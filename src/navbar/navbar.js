import React, { useEffect, useState } from 'react'
import './navbar.scss'
import CloseIcon from '@mui/icons-material/Close';
import Button  from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

const Navbar = () => {
    const [heightForNav, setHeightForNav] = useState(400);
    const [showNav, setShowNav] = useState(false);

    const [nav_active_one, setActiveOne] = useState(true);

    const [scrollHeight, setScrollHeight] = useState(window.scrollY)

    const [showSideNav, setShowSideNav] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', (e)=> {
            setScrollHeight(window.scrollY)

        })

        if(scrollHeight >= 200) {
            setActiveOne(false);
        }

        if(scrollHeight >= heightForNav) {
            setActiveOne(true);
            setShowNav(true);
        }

    }, [scrollHeight])

  return (
    <React.Fragment>

        <div className={showSideNav ? 'overlay-drop active' : 'overlay-drop'}>
                        
                        {/* <button className="overlay-closer" id="overlay-closer">
                                <svg role="img" style={{height: "16px", width: "16px", color: 'white'}} width="16" height="16" viewBox="0 0 20 20" fill="none" stroke-width="1" stroke="#666666" xmlns="http://www.w3.org/2000/svg" class="mobile-menu-close-button"><g><title></title>
                                    <path d="M15 5L5 15" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 5L15 15" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>
                        </button> */}
                        <IconButton onClick={()=>setShowSideNav(false)} className='overlay-closer' aria-label='close' color='primary'><CloseIcon/></IconButton>
                        <div className="side-links">
                        <li className="nav-items">
                            <a href="#contact">Contact us</a>
                            {/* {window.scrollTo({scrollY: '100px', })} */}
                        </li>
                        {/* <li className="nav-items">
                            <a href="#mission">Mission</a>
                        </li> */}
                        <li className="nav-items">
                            <a href="#services">Services</a>
                        </li>
                        <li className="nav-items">
                            <a href="#about">About us</a>
                        </li>
                        </div>
        </div>         
        <div className={showSideNav ? 'overlay-back-drop active' : 'overlay-back-drop'}>
        </div>
        <nav className={showNav ? 'nav-bar active' : 'nav-bar'} id={nav_active_one ? 'nav_bar' : 'active'}>
            <div className="nav-wrapper">
                <div className="left-nav" style={{display: 'flex'}}>   
                    <button onClick={()=>{setShowSideNav(true);}} className="hamburger-menu" id="hamburger-menu">
                                <svg role="img" width="20" height="30" viewBox="0 0 100 100" fill="var(--primary-color)" strokeWidth="1" stroke="white" xmlns="http://www.w3.org/2000/svg" className="burger-icon"><g><title></title>
                                    <path d="M84.7,53.7H15.1c-2.1,0-3.8-1.7-3.8-3.8v0c0-2.1,1.7-3.8,3.8-3.8h69.7c2.1,0,3.8,1.7,3.8,3.8v0C88.6,52,86.9,53.7,84.7,53.7  z"></path>
                                    <path d="M84.7,23.7H15.1c-2.1,0-3.8-1.7-3.8-3.8v0c0-2.1,1.7-3.8,3.8-3.8h69.7c2.1,0,3.8,1.7,3.8,3.8v0C88.6,22,86.9,23.7,84.7,23.7  z"></path>
                                    <path d="M84.7,83.7H15.1c-2.1,0-3.8-1.7-3.8-3.8v0c0-2.1,1.7-3.8,3.8-3.8h69.7c2.1,0,3.8,1.7,3.8,3.8v0C88.6,82,86.9,83.7,84.7,83.7  z"></path></g>
                                </svg>
                    </button>
                
                   
                    <div className="logo">
                        <img src="8-removebg-preview.png" alt="logo" />
                    </div>
                </div>
                <div className="nav-links">
                    <li className="nav-items">
                        <a href="#contact">Contact us</a>
                        {/* {window.scrollTo({scrollY: '100px', })} */}
                    </li>
                    {/* <li className="nav-items">
                        <a href="#mission">Mission</a>
                    </li> */}
                    <li className="nav-items">
                        <a href="#services">Services</a>
                    </li>
                    <li className="nav-items">
                        <a href="#about">About us</a>
                    </li>
                </div>
            </div>
        </nav>
    </React.Fragment>

  )
}

export default Navbar
