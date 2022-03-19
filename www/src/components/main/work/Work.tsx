import React, { useState, useEffect } from 'react';

import { Universe } from '../../../game-of-life/Universe';

const PIXELS_PER_CELL = 4;
const ROWS = Math.ceil(
   window.screen.height * window.devicePixelRatio / PIXELS_PER_CELL
);
const COLUMNS = Math.ceil(
   window.screen.width * window.devicePixelRatio / PIXELS_PER_CELL
);
const DOCUMENT_STYLE = getComputedStyle(document.documentElement);

const Work = () => {
   const [universe, _] = useState(() => new Universe({
      rows: ROWS,
      columns: COLUMNS,
      pixelsPerCell: PIXELS_PER_CELL,
      liveCellColor: DOCUMENT_STYLE.getPropertyValue('--ice'),
      deadCellColor: DOCUMENT_STYLE.getPropertyValue('--main-bg-color'),
   }));

   useEffect(() => {
      // Gives time for other canvas renders to finish.
      const timeoutId = setTimeout(() => {
         universe.startRendering();
         document.getElementById('canvas').style.opacity = '0.9';
      }, 400);

      return () => {
         clearTimeout(timeoutId);
         document.getElementById('canvas').style.opacity = '0';
         universe.stopRendering();
      };
   }, []);

   return (
      <div id='work' className='container'>
         <p className='text-container'>My Work</p>
      </div>
   );
}

export default Work;

