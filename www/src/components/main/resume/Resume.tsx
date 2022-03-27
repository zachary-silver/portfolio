import React, { useState } from 'react';

import { GameOfLife } from '../../../canvas/GameOfLife';
import { useCanvas } from '../../common/Util';
import {
   DOCUMENT_STYLE,
   VIEWPORT_HEIGHT,
   VIEWPORT_WIDTH,
} from '../../../common/util';

const PIXELS_PER_CELL = 4;

const Resume = () => {
   const [gameOfLife, _] = useState(() => new GameOfLife({
      rows: Math.ceil(VIEWPORT_HEIGHT / PIXELS_PER_CELL),
      columns: Math.ceil(VIEWPORT_WIDTH / PIXELS_PER_CELL),
      pixelsPerCell: PIXELS_PER_CELL,
      liveCellColor: DOCUMENT_STYLE.getPropertyValue('--light-blue'),
      deadCellColor: DOCUMENT_STYLE.getPropertyValue('--main-bg-color'),
   }));
   useCanvas(gameOfLife, '0.5');

   return (
      <div id='resume' className='container'>
         <p className='text-container'>Resume</p>
      </div>
   );
};

export default Resume;

