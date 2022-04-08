import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import NavigationBar, { INavigationLink } from './header/NavigationBar';
import { usePrevious } from './common/util';
import { hideElement } from '../common/util';

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
].map((navigationLink, index) => ({ ...navigationLink, position: index }));

const navigatedLeft = (current: INavigationLink, previous?: INavigationLink) => {
   return previous
      && current.pathname !== previous.pathname
      && current.position < previous.position;
};

const getClassNames = (current: INavigationLink, previous?: INavigationLink) => {
   return navigatedLeft(current, previous) ? 'main-reverse' : 'main';
};

const Portfolio = () => {
   const [component, setComponent] = useState(null);
   const [showComponent, setShowComponent] = useState(false);
   const [classNames, setClassNames] = useState('main');
   const pathname = useLocation().pathname;
   const nodeRef = useRef(null);

   const currentLink = navigationLinks.find(
      (link) => link.pathname === pathname
   );
   const previousLink: INavigationLink = usePrevious(currentLink);
   useEffect(() => {
      setClassNames(getClassNames(currentLink, previousLink));
   }, [currentLink.pathname]);

   useEffect(() => {
      setShowComponent(false);

      const timeoutId = setTimeout(() => {
         setComponent(currentLink.component);
         setShowComponent(true);
      }, TRANSITION_TIME);

      return () => clearTimeout(timeoutId);
   }, [pathname]);

   const links = navigationLinks.map((navigationLink) => ({
      ...navigationLink,
      current: navigationLink.pathname === currentLink.pathname,
   }));

   return (
      <React.Fragment>
         <header>
            <NavigationBar navigationLinks={links} />
         </header>
         <CSSTransition
            in={showComponent}
            timeout={TRANSITION_TIME}
            classNames={classNames}
            nodeRef={nodeRef}
            unmountOnExit
            onExiting={() => hideElement('canvas')}
         >
            <main ref={nodeRef} className='container'>
               {component}
            </main>
         </CSSTransition>
         <footer />
      </React.Fragment>
   );
};

export default Portfolio;

