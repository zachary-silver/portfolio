import React, { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Universe } from '../game-of-life/Universe';
import NavigationBar from './header/NavigationBar';
import Home from './main/home/Home';
import About from './main/about/About';
import Work from './main/work/Work';
import Resume from './main/resume/Resume';
import Contact from './main/contact/Contact';

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
            <NavigationBar />
         </header>
         <main>
            <Routes>
               <Route path='/' element={<Home />} />
               <Route path='about' element={<About />} />
               <Route path='work' element={<Work />} />
               <Route path='resume' element={<Resume />} />
               <Route path='contact' element={<Contact />} />
            </Routes>
         </main>
         <footer>
         </footer>
      </React.Fragment>
   );
};

export default Portfolio;

