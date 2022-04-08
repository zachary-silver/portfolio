import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faTwitter,
   faLinkedin,
   faGithub,
} from '@fortawesome/free-brands-svg-icons'

import './Author.css';

const GITHUB_LINK = 'https://github.com/zachary-silver';
const LINKEDIN_LINK = 'https://www.linkedin.com/in/zachary-silver/';
const TWITTER_LINK = 'https://twitter.com/zmansilver';

const Author = () => {
   return (
      <div id='author' className='container text-container'>
         <h1 id='name'>Zachary Silver</h1>
         <h3 id='occupation'>Software Developer</h3>
         <div id='social-media-links'>
            <a href={TWITTER_LINK} target='_blank'>
               <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href={LINKEDIN_LINK} target='_blank'>
               <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href={GITHUB_LINK} target='_blank'>
               <FontAwesomeIcon icon={faGithub} />
            </a>
         </div>
      </div>
   );
};

export default Author;

