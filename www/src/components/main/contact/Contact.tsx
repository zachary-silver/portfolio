import React, { useState } from 'react';

import { FractalTree } from '../../../canvas/FractalTree';
import { useCanvas } from '../../common/util';
import {
   VIEWPORT_WIDTH,
   VIEWPORT_HEIGHT,
   DOCUMENT_STYLE,
} from '../../../common/constants';
import { getTypingRate } from '../../../common/util';
import TerminalText, { ITerminalTextProps } from '../../common/TerminalText';

import './Contact.css';

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
   const [tree, _] = useState(() => new FractalTree({
      positions: [
         {
            x: VIEWPORT_WIDTH / 2,
            y: VIEWPORT_HEIGHT,
         },
      ],
      height: VIEWPORT_HEIGHT,
      width: VIEWPORT_WIDTH,
      branchLength: VIEWPORT_HEIGHT / 5,
      branchWidth: 10,
      startingAngle: 8,
      endingAngle: 45,
      maxDepth: 10,
      treeColor: DOCUMENT_STYLE.getPropertyValue('--light-blue'),
   }));
   useCanvas(tree, '0.5');

   const props: ITerminalTextProps = {
      text: EMAIL,
      rate: getTypingRate(EMAIL),
   };

   return (
      <div id='contact' className='container'>
         <a
            href={`mailto:${EMAIL}`}
            className='text-container clickable'
            onClick={() => { copyEmailToClipboard(); showTooltip(); }}
         >
            <h4 id='contact-terminal'>
               {'> '}<TerminalText {...props} />
            </h4>
         </a>
         <p id='email-tooltip'>Copied to clipboard!</p>
      </div>
   );
};

export default Contact;

