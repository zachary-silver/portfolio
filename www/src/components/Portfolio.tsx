import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import NavigationBar, {
   getPathnameToLinkMap,
   INavigationLink
} from './header/NavigationBar';
import { usePrevious } from './common/util';
import { hideCanvas } from '../common/util';

import About from './main/about/About';
import Contact from './main/contact/Contact';
import Home from './main/home/Home';
import Resume from './main/resume/Resume';
import Work from './main/work/Work';

import './Portfolio.css';

const TRANSITION_TIME = 500;

const navigationLinks: INavigationLink[] = [
   { pathname: '/', label: 'Home', component: <Home /> },
   { pathname: '/about', label: 'About Me', component: <About /> },
   { pathname: '/work', label: 'My Work', component: <Work /> },
   { pathname: '/resume', label: 'Resumé', component: <Resume /> },
   { pathname: '/contact', label: 'Contact', component: <Contact /> },
];
const PathnameToLink = getPathnameToLinkMap(navigationLinks);
const links = Object.values(PathnameToLink).map(
   (navigationLink) => navigationLink.link
);

const navigatedLeft = (current: INavigationLink, previous: INavigationLink) => {
   return previous
      && current.pathname !== previous.pathname
      && current.position < previous.position;
};

const getClassNames = (current: INavigationLink, previous: INavigationLink) => {
   return navigatedLeft(current, previous) ? 'main-reverse' : 'main';
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
         setMainComponent(currentLink.component);
         setShowComponent(true);
      }, TRANSITION_TIME);

      return () => clearTimeout(timeoutId);
   }, [pathname]);

   const currentLink = PathnameToLink[pathname];
   const previousLink: INavigationLink = usePrevious(currentLink);
   useEffect(() => {
      setClassNames(getClassNames(currentLink, previousLink));
   }, [currentLink.pathname]);

   return (
      <React.Fragment>
         <header>
            <NavigationBar links={links} />
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

