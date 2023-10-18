import React, { useState, useEffect } from 'react';

import TerminalText, { ITerminalTextProps } from '../../common/TerminalText';
import { getTypingRate } from '../../../common/util';

import './Greeting.css';

const GREETINGS = [
   "Hi, I'm Zack.",
   "Thanks for taking the time to check out my portfolio!",
];

const Greeting = () => {
   const [greetingIndex, setGreetingIndex] = useState(0);
   const [greeting, setGreeting] = useState(GREETINGS[0]);

   useEffect(() => {
      const timeoutId = setTimeout(() => {
         setGreeting(GREETINGS[greetingIndex]);
      }, 500);

      return () => clearTimeout(timeoutId);
   }, [greetingIndex]);

   const showNextGreeting = () => {
      setGreetingIndex((greetingIndex + 1) % GREETINGS.length);
   }

   const props: ITerminalTextProps = {
      text: greeting,
      accessibleText: GREETINGS.join(' '),
      rate: getTypingRate(greeting),
      delay: 1500,
      done: showNextGreeting,
      prompt: '> ',
   };

   return (
      <p id='greeting-terminal' className='text-container'>
         <TerminalText {...props} />
      </p>
   );
};

export default Greeting;

