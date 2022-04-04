import React, { useState, useEffect } from 'react';

import { GameOfLife } from '../../../canvas/GameOfLife';
import { useCanvas } from '../../common/util';
import {
   DOCUMENT_STYLE,
   VIEWPORT_HEIGHT,
   VIEWPORT_WIDTH,
} from '../../../common/constants';

import Project, { IProjectProps } from './Project';
import Scroll, { IScrollProps } from '../../common/Scroll';

const PIXELS_PER_CELL = 4;

const PROJECTS: IProjectProps[] = [
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
];

const projects = PROJECTS.map(
   (projectProps, index) => <Project key={index} {...projectProps} />
);

const Work = () => {
   const [gameOfLife, _] = useState(() => new GameOfLife({
      rows: Math.ceil(VIEWPORT_HEIGHT / PIXELS_PER_CELL + PIXELS_PER_CELL),
      columns: Math.ceil(VIEWPORT_WIDTH / PIXELS_PER_CELL + PIXELS_PER_CELL),
      pixelsPerCell: PIXELS_PER_CELL,
      liveCellColor: DOCUMENT_STYLE.getPropertyValue('--light-blue'),
      deadCellColor: DOCUMENT_STYLE.getPropertyValue('--main-bg-color'),
   }));
   useCanvas(gameOfLife, '0.5');

   useEffect(() => {
      document.getElementsByTagName('body')[0].style.overflowY = 'scroll';

      return () => {
         document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
      };
   }, []);

   return (
      <div id='work' className='container'>
         <Scroll components={projects} />
      </div>
   );
};

export default Work;

