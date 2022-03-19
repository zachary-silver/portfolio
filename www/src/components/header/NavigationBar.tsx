import React from 'react';
import { Link } from 'react-router-dom';

import About from '../main/about/About';
import Contact from '../main/contact/Contact';
import Home from '../main/home/Home';
import Resume from '../main/resume/Resume';
import Work from '../main/work/Work';

import './NavigationBar.css';

interface INavigationLink {
   component: JSX.Element,
   pathname: string,
   label: string,
   position?: number,
   link?: JSX.Element,
};

const navigationLinks: INavigationLink[] = [
   { pathname: '/', label: 'Home', component: <Home /> },
   { pathname: '/about', label: 'About Me', component: <About /> },
   { pathname: '/work', label: 'My Work', component: <Work /> },
   { pathname: '/resume', label: 'Resumé', component: <Resume /> },
   { pathname: '/contact', label: 'Contact', component: <Contact /> },
];

const PathnameToLink = navigationLinks.reduce(
   (navigationLinks, navigationLink, index) => {
      navigationLink.position = index;
      navigationLink.link = (
         <Link
            to={navigationLink.pathname}
            key={index}
            className='text-container'
         >
            {navigationLink.label}
         </Link>
      );
      return { ...navigationLinks, [navigationLink.pathname]: navigationLink };
   },
   {} as { [key: string]: INavigationLink }
);

const NavigationBar = () => {
   return (
      <nav className='container'>
         {Object.values(PathnameToLink).map(
            (navigationLink) => navigationLink.link
         )}
      </nav>
   );
};

export {
   PathnameToLink,
   INavigationLink,
};

export default NavigationBar;

