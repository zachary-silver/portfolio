import React from 'react';
import { Link } from 'react-router-dom';

import './NavigationBar.css';

const NavigationBar = () => {
   return (
      <nav className='container'>
         <Link to="/" className='text-container'>Home</Link>
         <Link to="/about" className='text-container'>About Me</Link>
         <Link to="/work" className='text-container'>My Work</Link>
         <Link to="/resume" className='text-container'>Resumé</Link>
         <Link to="/contact" className='text-container'>Contact</Link>
      </nav>
   );
}

export default NavigationBar;

