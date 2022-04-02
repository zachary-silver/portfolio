import React from 'react';
import { Link } from 'react-router-dom';

import './NavigationBar.css';

interface INavigationBarProps {
   links: JSX.Element[];
};

interface INavigationLink {
   component: JSX.Element,
   pathname: string,
   label: string,
   position?: number,
   link?: JSX.Element,
};

const getPathnameToLinkMap = (navigationLinks: INavigationLink[]) => {
   return navigationLinks.reduce(
      (navigationLinks, navigationLink, index) => ({
         ...navigationLinks,
         [navigationLink.pathname]: {
            ...navigationLink,
            position: index,
            link: (
               <Link
                  to={navigationLink.pathname}
                  key={index}
                  className='text-container'
               >
                  <h4>{navigationLink.label}</h4>
               </Link>
            )
         }
      }),
      {} as { [pathname: string]: INavigationLink }
   );
};

const NavigationBar = ({ links }: INavigationBarProps) => {
   return (
      <nav className='container'>
         {links}
      </nav>
   );
};

export {
   INavigationLink,
   getPathnameToLinkMap,
};

export default NavigationBar;

