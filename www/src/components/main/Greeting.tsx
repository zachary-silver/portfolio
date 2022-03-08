import React, { useState, useEffect } from 'react';

import TerminalText, { ITerminalTextProps } from '../common/TerminalText';

import {
   GREETINGS,
} from './constants';

import './Greeting.css';

const getTypingRate = (text: string) => 30 + 1000 * (1 / (text.length * text.length));

const Greeting = () => {
   const [greetingIndex, setGreetingIndex] = useState(0);
   const [greeting, setGreeting] = useState(GREETINGS[0]);

   useEffect(() => {
      setGreeting(GREETINGS[greetingIndex]);
   }, [greetingIndex]);

   const showNextGreeting = () => {
      setGreetingIndex((greetingIndex + 1) % GREETINGS.length);
   }

   const props: ITerminalTextProps = {
      text: greeting,
      rate: getTypingRate(greeting),
      done: () => setTimeout(showNextGreeting, 500)
   };

   return (
      <p id='greeting-terminal' className='text-container'>
         {'> '}<TerminalText {...props} />
      </p>
   );
};

export default Greeting;

