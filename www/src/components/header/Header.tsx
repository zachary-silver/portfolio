import React from 'react';
import {
   Link,
} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faTwitter,
   faLinkedin,
   faGithub,
} from '@fortawesome/free-brands-svg-icons'

import './Header.css';

const GITHUB_LINK = 'https://github.com/zachary-silver';
const LINKEDIN_LINK = 'https://www.linkedin.com/in/zachary-silver/';
const TWITTER_LINK = 'https://twitter.com/zmansilver';

const Header = () => {
   return (
      <header>
         <div id='header' className='container text-container'>
            <h1>Zachary Silver</h1>
            <h3>Software Developer</h3>
            <div id='social-media-links'>
               <a href={TWITTER_LINK}>
                  <FontAwesomeIcon icon={faTwitter} />
               </a>
               <a href={LINKEDIN_LINK}>
                  <FontAwesomeIcon icon={faLinkedin} />
               </a>
               <a href={GITHUB_LINK}>
                  <FontAwesomeIcon icon={faGithub} />
               </a>
            </div>
         </div>
         <nav>
            <Link to="/" className='text-container'>Home</Link>
            <Link to="/about" className='text-container'>About Me</Link>
         </nav>
      </header>
   );
};

export default Header;

