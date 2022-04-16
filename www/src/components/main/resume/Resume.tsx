import React, { useState } from 'react';

import { GameOfLife } from '../../../canvas/GameOfLife';
import { getDocumentStyle, getWindowProperties } from '../../../common/util';
import { useCanvas } from '../../common/util';

import './Resume.css';

const PIXELS_PER_CELL = 4;

const Resume = () => {
   const documentStyle = getDocumentStyle();
   const { width, height } = getWindowProperties();
   const [gameOfLife, _] = useState(() => new GameOfLife({
      rows: Math.ceil(height / PIXELS_PER_CELL + PIXELS_PER_CELL),
      columns: Math.ceil(width / PIXELS_PER_CELL + PIXELS_PER_CELL),
      pixelsPerCell: PIXELS_PER_CELL,
      liveCellColor: documentStyle.getPropertyValue('--light-blue'),
      deadCellColor: documentStyle.getPropertyValue('--main-bg-color'),
      canvasId: 'canvas',
   }));
   useCanvas(gameOfLife, '0.3');

   return (
      <div id='resume' className='container'>
         <iframe
            id='resume-pdf'
            className='text-container'
            src='zachary-silver-resume.pdf'
         />
      </div>
   );
};

export default Resume;

