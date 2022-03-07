import React, { useEffect, useRef } from 'react';
import {
   Routes,
   Route,
} from 'react-router-dom';

import { Universe } from '../game-of-life/Universe';
import Greeting from './home/Greeting';
import About from './about/About';

import './Portfolio.css';

const PIXELS_PER_CELL = 5;
const DOCUMENT_STYLE = getComputedStyle(document.documentElement);

const Portfolio = () => {
   const universeRef = useRef(new Universe({
      rows: Math.ceil(window.screen.height * window.devicePixelRatio / PIXELS_PER_CELL),
      columns: Math.ceil(window.screen.width * window.devicePixelRatio / PIXELS_PER_CELL),
      pixelsPerCell: PIXELS_PER_CELL,
      liveCellColor: DOCUMENT_STYLE.getPropertyValue('--main-text-color'),
      deadCellColor: DOCUMENT_STYLE.getPropertyValue('--main-bg-color'),
   }));

   useEffect(universeRef.current.render, []);

   return (
      <div id='portfolio'>
         <Routes>
            <Route path='/' element={<Greeting />}>
               <Route path='about' element={<About />} />
            </Route>
         </Routes>
      </div>
   );
};

export default Portfolio;

