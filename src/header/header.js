import React from 'react'
import './header.scss'

const Header = () => {
  return (
    <header class="header-container">
      <div class="header-content-wrapper">
          <p class="header-describe">
              <span style={{color: "rgb(22, 181, 22)"}}>Welcome</span> to <span style={{color: "rgb(22, 181, 22)"}}></span> <br />
              your all in one Task manager.
              Create, save, Edit and manage all your tasks in one place
              
          </p>
          <div class="header-icon">
              <img src="pngfind.com-trello-logo-png-1414520.png" alt="img" />
          </div>
      </div>
    </header>
  )
}

export default Header
