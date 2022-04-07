import React, { useState } from 'react';

import { GameOfLife } from '../../../canvas/GameOfLife';
import { useCanvas } from '../../common/util';
import {
   DOCUMENT_STYLE,
   VIEWPORT_HEIGHT,
   VIEWPORT_WIDTH,
} from '../../../common/constants';

import Project from './Project';
import Scroll from '../../common/Scroll';

import './Work.css';

const PIXELS_PER_CELL = 4;

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

const Work = () => {
   const [gameOfLife, _] = useState(() => new GameOfLife({
      rows: Math.ceil(VIEWPORT_HEIGHT / PIXELS_PER_CELL + PIXELS_PER_CELL),
      columns: Math.ceil(VIEWPORT_WIDTH / PIXELS_PER_CELL + PIXELS_PER_CELL),
      pixelsPerCell: PIXELS_PER_CELL,
      liveCellColor: DOCUMENT_STYLE.getPropertyValue('--light-blue'),
      deadCellColor: DOCUMENT_STYLE.getPropertyValue('--main-bg-color'),
   }));
   useCanvas(gameOfLife, '0.3');

   return (
      <div id='work' className='container'>
         <Scroll components={PROJECTS} />
      </div>
   );
};

export default Work;

