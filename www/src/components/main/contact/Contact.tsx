import React, { useState } from 'react';

import TerminalText, { ITerminalTextProps } from '../../common/TerminalText';
import { FractalTree } from '../../../canvas/FractalTree';
import { useCanvas } from '../../common/util';
import {
   getDocumentStyle,
   getTypingRate,
   getWindowProperties,
   hideElement,
   showElement
} from '../../../common/util';

import './Contact.css';

const EMAIL = 'zmansilver@gmail.com';

const copyEmailToClipboard = (_event?: React.MouseEvent<HTMLElement>) => {
   navigator.clipboard.writeText(EMAIL);
};

const showTooltip = () => {
   showElement('email-tooltip', '1');
   setTimeout(() => {
      hideElement('email-tooltip');
   }, 1000);
};

const Contact = () => {
   const { width, height } = getWindowProperties();
   const [tree, _] = useState(() => new FractalTree({
      positions: [{
         x: width / 2,
         y: height,
      }],
      height,
      width,
      branchLength: height / 5,
      branchWidth: 10,
      startingAngle: 8,
      endingAngle: 45,
      maxDepth: 10,
      treeColor: {
         red: '104',
         green: '167',
         blue: '212',
      },
      canvasId: 'canvas',
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
            onClick={() => {
               copyEmailToClipboard();
               showTooltip();
            }}
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

