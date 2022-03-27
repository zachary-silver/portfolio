import React, { useState, useEffect } from 'react';

const SPACE_UNICODE = '\u00a0';
const WHITE_SPACE = SPACE_UNICODE + SPACE_UNICODE;
const CURSOR = '_';

interface ITerminalTextProps {
   text: string,
   rate: number,
   delay?: number,
   done?: Function,
};

const TerminalText = ({ text, rate, delay, done }: ITerminalTextProps) => {
   const [currentText, setCurrentText] = useState('');
   const [showCursor, setShowCursor] = useState(true);
   const [reverse, setReverse] = useState(false);

   // When given new text to display, restart the process.
   useEffect(() => {
      setReverse(false);
      const timeoutId = setTimeout(growText, delay / 2);

      return () => clearTimeout(timeoutId);
   }, [text]);

   // Blink the cursor.
   useEffect(() => {
      const timeoutId = setTimeout(() => setShowCursor(!showCursor), 400);

      return () => clearTimeout(timeoutId);
   }, [showCursor]);

   // Type the text.
   useEffect(() => {
      let timeoutId: NodeJS.Timeout;

      if (currentText.length === 0 && reverse) {
         done?.();
      } else if (currentText.length === text.length) {
         setReverse(true);
         timeoutId = setTimeout(shrinkText, delay);
      } else if (reverse) {
         timeoutId = setTimeout(shrinkText, 10);
      } else if (currentText.length === 0) {
         timeoutId = setTimeout(growText, delay / 2);
      } else {
         timeoutId = setTimeout(growText, rate);
      }

      return () => clearTimeout(timeoutId);
   }, [currentText]);

   const growText = () => {
      setCurrentText(text.substring(0, currentText.length + 1));
   };

   const shrinkText = () => {
      setCurrentText(currentText.substring(0, currentText.length - 1));
   };

   return (
      <React.Fragment>
         {currentText}{showCursor ? CURSOR : WHITE_SPACE}
      </React.Fragment>
   );
};

export {
   ITerminalTextProps,
};

export default TerminalText;

