import React, { useEffect, useRef } from 'react';
import {
   Routes,
   Route,
} from 'react-router-dom';

import { Universe } from '../game-of-life/Universe';
import Author from './header/Author';
import NavigationBar from './header/NavigationBar';
import Greeting from './main/Greeting';
import About from './main/About';

import './Portfolio.css';

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
      <React.Fragment>
         <header>
            <Author />
            <NavigationBar />
         </header>
         <main>
            <Routes>
               <Route path='/' element={<Greeting />} />
               <Route path='about' element={<About />} />
            </Routes>
         </main>
      </React.Fragment>
   );
};

export default Portfolio;

