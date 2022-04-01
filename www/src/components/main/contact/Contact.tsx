import React, { useState } from 'react';

import { SierpinskiTriangle } from '../../../canvas/SierpinskiTriangle';
import { useCanvas } from '../../common/util';
import {
   VIEWPORT_WIDTH,
   VIEWPORT_HEIGHT,
} from '../../../common/constants';
import TerminalText, { ITerminalTextProps } from '../../common/TerminalText';
import { getTypingRate } from '../../../common/util';

import './Contact.css';

const SIDE_LENGTH = VIEWPORT_HEIGHT;
const EMAIL = 'zmansilver@gmail.com';

const copyEmailToClipboard = (_event?: React.MouseEvent<HTMLElement>) => {
   navigator.clipboard.writeText(EMAIL);
};

const showTooltip = () => {
   document.getElementById('email-tooltip').style.opacity = '1';
   setTimeout(() => {
      document.getElementById('email-tooltip').style.opacity = '0';
   }, 1000);
};

const Contact = () => {
   const [triangle, _] = useState(() => new SierpinskiTriangle({
      height: VIEWPORT_HEIGHT,
      width: VIEWPORT_WIDTH,
      sideLength: SIDE_LENGTH,
      positions: [
         {
            x: VIEWPORT_WIDTH / 2 - SIDE_LENGTH / 2,
            y: VIEWPORT_HEIGHT
         },
      ],
      maxDepth: 7,
      triangleColor: 'green',
   }));
   useCanvas(triangle, '0.5');

   const props: ITerminalTextProps = {
      text: EMAIL,
      rate: getTypingRate(EMAIL),
   };

   return (
      <div id='contact' className='container'>
         <button
            id='email-button'
            onClick={() => { copyEmailToClipboard(); showTooltip(); }}
            className='text-container'
         >
            <h2 id='contact-terminal'>
               {'> '}<TerminalText {...props} />
            </h2>
         </button>
         <p id='email-tooltip'>Copied to clipboard!</p>
      </div>
   );
};

export default Contact;

