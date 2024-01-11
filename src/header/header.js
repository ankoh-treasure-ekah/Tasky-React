import React from 'react'
import './header.scss'
import Button  from '@mui/material/Button'

const Header = () => {
  return (
    <React.Fragment>
        <header className="page-header">
            <div className="header-container">
                <div className="header-text">
                   <p> <span style={{color: 'var(--primary-color)'}}>Banteccul</span> is Here to Help You Save & Spend Better
                     </p>
                    <Button className='header-contact-btn' variant='contained'><a href="#contact" style={{textDecoration: 'none', color: 'white'}}>CONTACT US</a></Button>
                </div>
                <div className="header-img">
                    <div className="img-container">
                        <img src="Saving money-amico.png" alt="headerLogo" />
                    </div>
                </div>
            </div>
        </header>
    </React.Fragment>
  )
}

export default Header
