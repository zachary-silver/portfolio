import React, { useState } from 'react';

import { SierpinskiTriangle } from '../../../canvas/SierpinskiTriangle';
import { useCanvas } from '../../common/Util';
import {
   VIEWPORT_WIDTH,
   VIEWPORT_HEIGHT,
} from '../../../common/util';

const Contact = () => {
   const [triangle, _] = useState(() => new SierpinskiTriangle({
      height: VIEWPORT_HEIGHT,
      width: VIEWPORT_WIDTH,
      sideLength: VIEWPORT_WIDTH / 2,
      positions: [
         {
            x: 0,
            y: VIEWPORT_HEIGHT - 10,
         },
         {
            x: VIEWPORT_WIDTH / 2,
            y: VIEWPORT_HEIGHT - 10,
         }
      ],
      maxDepth: 8,
      triangleColor: 'green',
   }));
   useCanvas(triangle, '0.5');

   return (
      <div id='contact' className='container'>
         <p className='text-container'>Contact Me</p>
      </div>
   );
};

export default Contact;

