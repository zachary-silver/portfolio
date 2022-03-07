import React, { useState, useEffect } from 'react';

const SPACE_UNICODE = '\u00a0';
const WHITE_SPACE = SPACE_UNICODE + SPACE_UNICODE;
const CURSOR = '_';

interface ITerminalTextProps {
   text: string,
   rate: number,
   done?: Function,
};

const TerminalText = ({
   text,
   rate,
   done
}: ITerminalTextProps) => {
   const [currentText, setCurrentText] = useState('');
   const [showCursor, setShowCursor] = useState(true);
   const [reverse, setReverse] = useState(false);

   // When given new text to display, restart the process.
   useEffect(() => {
      setReverse(false);
      growText();
   }, [text]);

   // Blink the cursor.
   useEffect(() => {
      const timeoutId = setTimeout(() => setShowCursor(!showCursor), 400);

      return () => clearTimeout(timeoutId);
   }, [showCursor]);

   // Execute typing effect.
   useEffect(() => {
      let timeoutId: any;

      if (currentText.length === 0 && reverse) {
         done?.();
      } else if (currentText.length === text.length) {
         setReverse(true);
         timeoutId = setTimeout(shrinkText, 2000);
      } else if (reverse) {
         timeoutId = setTimeout(shrinkText, 10);
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

