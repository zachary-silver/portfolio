import React, { useState, useEffect } from 'react';

interface ITerminalTextProps {
   text: string,
   rate: number,
   done?: Function,
};

export const TerminalText = ({
   text,
   rate,
   done
}: ITerminalTextProps) => {
   const [currentText, setCurrentText] = useState('');
   const [showCursor, setShowCursor] = useState(true);
   const [reverse, setReverse] = useState(false);

   useEffect(() => {
      if (currentText.length === 0 && reverse) {
         done?.();
      } else if (currentText.length === text.length) {
         setReverse(true);
         setTimeout(shrinkText, 2000);
      } else if (reverse) {
         setTimeout(shrinkText, 10);
      } else {
         setTimeout(growText, rate);
      }
   }, [currentText]);

   useEffect(() => {
      setReverse(false);
      growText();
   }, [text]);

   useEffect(() => {
      setTimeout(() => setShowCursor(!showCursor), 400);
   }, [showCursor]);

   const growText = () => {
      setCurrentText(text.substring(0, currentText.length + 1));
   };

   const shrinkText = () => {
      setCurrentText(currentText.substring(0, currentText.length - 1));
   };

   return (
      <React.Fragment>
         {currentText}{showCursor ? '_' : '\u00a0\u00a0'}
      </React.Fragment>
   );
};

export {
   ITerminalTextProps,
};

export default TerminalText;

