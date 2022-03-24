import React, { useEffect, useState } from 'react';

import { SierpinskiTriangle } from '../../../canvas/SierpinskiTriangle';
import { VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from '../../../common/util';
import { showCanvas } from '../../common/Util';

const Resume = () => {
   const [tree, _] = useState(() => new SierpinskiTriangle({
      height: VIEWPORT_HEIGHT,
      width: VIEWPORT_WIDTH,
      sideLength: 1000,
      positions: [
         {
            x: VIEWPORT_WIDTH / 2,
            y: VIEWPORT_HEIGHT - 100,
         }
      ],
      maxDepth: 8,
      triangleColor: 'green',
   }));

   useEffect(() => {
      showCanvas('1.0');
      tree.initializeCanvas();
      tree.startRendering();

      return () => {
         tree.stopRendering();
      };
   }, []);

   return (
      <div id='resume' className='container'>
      </div>
   );
}

export default Resume;

