import React, { useState } from 'react';

import { GameOfLife } from '../../../canvas/GameOfLife';
import { getDocumentStyle, getWindowProperties } from '../../../common/util';
import { useCanvas } from '../../common/util';
import Scroll from '../../common/Scroll';
import Project from './Project';

import './Work.css';

const PROJECTS = [
   {
      name: 'Twitch Chat Sentiment Analysis Dashboard',
      url: 'https://github.com/zachary-silver/twitch-sentiment-analysis',
      imageSrc: 'twitch-chat-sentiment-analysis.jpg',
   },
   {
      name: 'System Status Monitor',
      url: 'https://github.com/zachary-silver/dwmstatus',
      imageSrc: 'dwmstatus.jpg',
   },
   {
      name: 'Tic-Tac-Toe',
      url: 'https://github.com/zachary-silver/tic-tac-toe',
      imageSrc: 'tic-tac-toe.jpg',
   },
   {
      name: 'New Music Finder',
      url: 'https://github.com/zachary-silver/new-music-finder',
      imageSrc: 'music.jpg',
   },
   {
      name: 'Calculator',
      url: 'https://github.com/zachary-silver/silver-calculator',
      imageSrc: 'silver-calculator.jpg',
   },
].map((projectProps, index) => <Project key={index} {...projectProps} />);

const PIXELS_PER_CELL = 4;

const Work = () => {
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
      <div id='work' className='container'>
         <Scroll components={PROJECTS} />
      </div>
   );
};

export default Work;

