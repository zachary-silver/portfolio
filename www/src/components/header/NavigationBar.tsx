import React from 'react';
import { Link } from 'react-router-dom';

import './NavigationBar.css';

interface INavigationLink {
   pathname: string,
   label: string,
   position?: number,
   link?: JSX.Element,
};

const navigationLinks: INavigationLink[] = [
   { pathname: '/', label: 'Home' },
   { pathname: '/about', label: 'About Me' },
   { pathname: '/work', label: 'My Work' },
   { pathname: '/resume', label: 'Resumé' },
   { pathname: '/contact', label: 'Contact' },
];

const PathnameToLink = navigationLinks.reduce((obj, navigationLink, i) => {
   navigationLink.position = i;
   navigationLink.link = (
      <Link to={navigationLink.pathname} key={i} className='text-container'>
         {navigationLink.label}
      </Link>
   );
   return { ...obj, [navigationLink.pathname]: navigationLink };
}, {} as any);

console.log(JSON.stringify(PathnameToLink, null, 2));

const NavigationBar = () => {
   return (
      <nav className='container'>
         {Object.values(PathnameToLink).map(
            (navigationLink: INavigationLink) => navigationLink.link
         )}
      </nav>
   );
}

export {
   PathnameToLink,
   INavigationLink,
};

export default NavigationBar;

