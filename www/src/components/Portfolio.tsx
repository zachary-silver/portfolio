import React, { useEffect, useRef } from 'react';
import {
   Routes,
   Route,
} from 'react-router-dom';

import { Universe } from '../game-of-life/Universe';
import Header from './header/Header';
import Greeting from './main/Greeting';
import About from './main/About';

const PIXELS_PER_CELL = 4;
const DOCUMENT_STYLE = getComputedStyle(document.documentElement);
const ROWS = Math.ceil(
   window.screen.height * window.devicePixelRatio / PIXELS_PER_CELL
);
const COLUMNS = Math.ceil(
   window.screen.width * window.devicePixelRatio / PIXELS_PER_CELL
);

const Portfolio = () => {
   const universeRef = useRef(new Universe({
      rows: ROWS,
      columns: COLUMNS,
      pixelsPerCell: PIXELS_PER_CELL,
      liveCellColor: DOCUMENT_STYLE.getPropertyValue('--main-text-color'),
      deadCellColor: DOCUMENT_STYLE.getPropertyValue('--main-bg-color'),
   }));

   useEffect(universeRef.current.render, []);

   return (
      <div id='portfolio' className='container'>
         <Header />
         <main>
            <Routes>
               <Route path='/' element={<Greeting />} />
               <Route path='about' element={<About />} />
            </Routes>
         </main>
      </div>
   );
};

export default Portfolio;

