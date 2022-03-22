import React, { useState, useEffect } from 'react';

import { GameOfLife } from '../../../canvas/GameOfLife';
import { showCanvas } from '../../common/Util';
import {
   DOCUMENT_STYLE,
   VIEWPORT_HEIGHT,
   VIEWPORT_WIDTH
} from '../../../common/util';

const PIXELS_PER_CELL = 4;
const ROWS = Math.ceil(VIEWPORT_HEIGHT / PIXELS_PER_CELL);
const COLUMNS = Math.ceil(VIEWPORT_WIDTH / PIXELS_PER_CELL);

const Work = () => {
   const [gameOfLife, _] = useState(() => new GameOfLife({
      rows: ROWS,
      columns: COLUMNS,
      pixelsPerCell: PIXELS_PER_CELL,
      liveCellColor: DOCUMENT_STYLE.getPropertyValue('--ice'),
      deadCellColor: DOCUMENT_STYLE.getPropertyValue('--main-bg-color'),
   }));

   useEffect(() => {
      // Gives time for other canvas renders to finish.
      const timeoutId = setTimeout(() => {
         gameOfLife.initializeCanvas();
         gameOfLife.startRendering();
         showCanvas('0.5');
      }, 10);

      return () => {
         clearTimeout(timeoutId);
         gameOfLife.stopRendering();
      };
   }, []);

   return (
      <div id='work' className='container'>
         <p className='text-container'>My Work</p>
      </div>
   );
}

export default Work;

