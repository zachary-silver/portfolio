import React from 'react';
import { Link } from 'react-router-dom';

import './NavigationBar.css';

const NavigationBar = () => {
   return (
      <nav className='container'>
         <Link to="/" className='text-container'>Home</Link>
         <Link to="/about" className='text-container'>About Me</Link>
      </nav>
   );
}

export default NavigationBar;

