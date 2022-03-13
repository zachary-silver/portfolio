import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { Universe } from '../game-of-life/Universe';
import NavigationBar, { PathnameToLink, INavigationLink } from './header/NavigationBar';
import { usePrevious } from './common/Util';

import './Portfolio.css';

const PIXELS_PER_CELL = 4;
const ROWS = Math.ceil(
   window.screen.height * window.devicePixelRatio / PIXELS_PER_CELL
);
const COLUMNS = Math.ceil(
   window.screen.width * window.devicePixelRatio / PIXELS_PER_CELL
);
const DOCUMENT_STYLE = getComputedStyle(document.documentElement);
const TRANSITION_TIME = 500;

const getClassNames = (
   link: INavigationLink,
   previousLink: INavigationLink
) => {
   if (previousLink &&
      link.pathname !== previousLink.pathname &&
      link.position < previousLink.position) {
      return 'main-reverse';
   } else {
      return 'main';
   }
};

const Portfolio = () => {
   const [universe, _] = useState(() => new Universe({
      rows: ROWS,
      columns: COLUMNS,
      pixelsPerCell: PIXELS_PER_CELL,
      liveCellColor: DOCUMENT_STYLE.getPropertyValue('--main-text-color'),
      deadCellColor: DOCUMENT_STYLE.getPropertyValue('--main-bg-color'),
   }));
   const [mainComponent, setMainComponent] = useState(null);
   const [showComponent, setShowComponent] = useState(false);
   const [classNames, setClassNames] = useState('main');
   const pathname = useLocation().pathname;
   const nodeRef = useRef(null);

   useEffect(() => {
      const timeoutId = setTimeout(universe.render, TRANSITION_TIME);

      return () => clearTimeout(timeoutId);
   }, [universe]);

   useEffect(() => {
      setShowComponent(false);

      const timeoutId = setTimeout(() => {
         setMainComponent(link.component);
         setShowComponent(true);
      }, TRANSITION_TIME);

      return () => clearTimeout(timeoutId);
   }, [pathname]);

   const link = PathnameToLink[pathname];
   const previousLink: INavigationLink = usePrevious(link);
   useEffect(() => {
      setClassNames(getClassNames(link, previousLink));
   }, [link.pathname]);

   return (
      <React.Fragment>
         <header>
            <NavigationBar />
         </header>
         <CSSTransition
            in={showComponent}
            timeout={TRANSITION_TIME}
            classNames={classNames}
            nodeRef={nodeRef}
            unmountOnExit
         >
            <main ref={nodeRef}>
               {mainComponent}
            </main>
         </CSSTransition>
         <footer>
         </footer>
      </React.Fragment>
   );
};

export default Portfolio;

