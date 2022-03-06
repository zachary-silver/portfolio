import React, { useState, useEffect } from 'react';

import './Greeting.css';

import TerminalText, { ITerminalTextProps } from './common/TerminalText';

const GREETINGS = [
   "Hi, I'm Zack",
   "Thanks for taking the time to check out my portfolio!",
];

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
      <p id='greeting'>
         {'> '}<TerminalText {...props} />
      </p>
   );
};

export default Greeting;

