import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faTwitter,
   faLinkedin,
   faGithub,
} from '@fortawesome/free-brands-svg-icons'

import TerminalText, { ITerminalTextProps } from './common/TerminalText';

import {
   GREETINGS,
   TWITTER_LINK,
   LINKEDIN_LINK,
   GITHUB_LINK,
} from './constants';

import './Greeting.css';

const getTypingRate = (text: string) => 30 + 1000 * (1 / (text.length * text.length));

export const Greeting = () => {
   const [greetingIndex, setGreetingIndex] = useState(0);
   const [text, setText] = useState(GREETINGS[0]);

   useEffect(() => {
      setText(GREETINGS[greetingIndex]);
   }, [greetingIndex]);

   const showNextGreeting = () => {
      setGreetingIndex((greetingIndex + 1) % GREETINGS.length);
   }

   const props: ITerminalTextProps = {
      text,
      rate: getTypingRate(text),
      done: () => setTimeout(showNextGreeting, 500)
   };

   return (
      <div id='greeting'>
         <div id='description'>
            <h1>Zachary Silver</h1>
            <h3>Software Developer</h3>
            <div id='social-media-icons'>
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
         <p id='terminal'>
            {'> '}<TerminalText {...props} />
         </p>
      </div>
   );
};

export default Greeting;

