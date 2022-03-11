import React, { useState, useEffect } from 'react';

import TerminalText, { ITerminalTextProps } from '../../common/TerminalText';

// import {
//    transitionIn,
//    transitionOut,
// } from '../../common/util';

import './Greeting.css';

const GREETINGS = [
   "Hi, I'm Zack",
   "Thanks for taking the time to check out my portfolio!",
];

const getTypingRate = (text: string) => 30 + 1000 * (1 / (text.length * text.length));

const Greeting = () => {
   const [greetingIndex, setGreetingIndex] = useState(0);
   const [greeting, setGreeting] = useState(GREETINGS[0]);

   // useEffect(() => {
   //    transitionIn('main');

   //    return () => transitionOut('main');
   // }, []);

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
      rate: getTypingRate(greeting),
      done: showNextGreeting,
   };

   return (
      <p id='greeting-terminal' className='text-container'>
         {'> '}<TerminalText {...props} />
      </p>
   );
};

export default Greeting;

