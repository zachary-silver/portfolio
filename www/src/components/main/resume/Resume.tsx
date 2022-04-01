import React, { useState } from 'react';

import { GameOfLife } from '../../../canvas/GameOfLife';
import { useCanvas } from '../../common/util';
import {
   DOCUMENT_STYLE,
   VIEWPORT_HEIGHT,
   VIEWPORT_WIDTH,
} from '../../../common/constants';

import './Resume.css';

const PIXELS_PER_CELL = 4;

const Resume = () => {
   const [gameOfLife, _] = useState(() => new GameOfLife({
      rows: Math.ceil(VIEWPORT_HEIGHT / PIXELS_PER_CELL + PIXELS_PER_CELL),
      columns: Math.ceil(VIEWPORT_WIDTH / PIXELS_PER_CELL + PIXELS_PER_CELL),
      pixelsPerCell: PIXELS_PER_CELL,
      liveCellColor: DOCUMENT_STYLE.getPropertyValue('--light-blue'),
      deadCellColor: DOCUMENT_STYLE.getPropertyValue('--main-bg-color'),
   }));
   useCanvas(gameOfLife, '0.5');

   return (
      <div id='resume' className='container'>
         <iframe id='resume-pdf' src='ZacharySilverResume.pdf' />
      </div>
   );
};

export default Resume;

