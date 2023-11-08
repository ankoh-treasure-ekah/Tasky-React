import React, { useEffect, useState } from 'react'
import './footer.scss'

const Footer = () => {

    const [year, _setYear] = useState(new Date().getFullYear().toString())
    const [name, _setName] = useState('Treasure.co');

  return (
    <footer class="footerContainer">
        <p>Copyright &copy; {name}  {year} all rights reserved </p>
    </footer>

  )
}

export default Footer
