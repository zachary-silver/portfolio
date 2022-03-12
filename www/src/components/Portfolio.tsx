import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

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
const TRANSITION_TIME = 500;

const getMainComponent = (pathname: string) => {
   switch (pathname) {
      case '/':
         return <Home />;
      case '/about':
         return <About />;
      case '/work':
         return <Work />;
      case '/resume':
         return <Resume />;
      case '/contact':
         return <Contact />;
      default:
         throw new Error('Reached default case in getMainComponent');
   }
}

const Portfolio = () => {
   const universeRef = useRef(new Universe({
      rows: ROWS,
      columns: COLUMNS,
      pixelsPerCell: PIXELS_PER_CELL,
      liveCellColor: DOCUMENT_STYLE.getPropertyValue('--main-text-color'),
      deadCellColor: DOCUMENT_STYLE.getPropertyValue('--main-bg-color'),
   }));
   const nodeRef = useRef(null);
   const [MainComponent, setMainComponent] = useState<JSX.Element>(<Home />);
   const [transition, setTransition] = useState(false);
   const pathname = useLocation().pathname;

   useEffect(() => {
      const timeoutId = setTimeout(universeRef.current.render, 2000);

      return () => clearTimeout(timeoutId);
   }, []);

   useEffect(() => {
      setTransition(false);

      const timeoutId = setTimeout(() => {
         setTransition(true);
         setMainComponent(getMainComponent(pathname));
      }, TRANSITION_TIME);

      return () => clearTimeout(timeoutId);
   }, [pathname]);

   return (
      <React.Fragment>
         <header>
            <NavigationBar />
         </header>
         <main>
            <CSSTransition
               in={transition}
               appear={transition}
               timeout={TRANSITION_TIME}
               classNames='main'
               unmountOnExit
               nodeRef={nodeRef}
            >
               <div ref={nodeRef}>
                  {MainComponent}
               </div>
            </CSSTransition>
         </main>
         <footer>
         </footer>
      </React.Fragment>
   );
};

export default Portfolio;

