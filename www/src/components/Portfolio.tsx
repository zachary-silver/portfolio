import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import NavigationBar, { PathnameToLink, INavigationLink } from './header/NavigationBar';
import { usePrevious, hideCanvas } from './common/Util';

import './Portfolio.css';

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
   const [mainComponent, setMainComponent] = useState(null);
   const [showComponent, setShowComponent] = useState(false);
   const [classNames, setClassNames] = useState('main');
   const pathname = useLocation().pathname;
   const nodeRef = useRef(null);

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
            onExiting={hideCanvas}
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

