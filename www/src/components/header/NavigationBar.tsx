import React from 'react';
import { Link } from 'react-router-dom';

import './NavigationBar.css';

interface INavigationBarProps {
   navigationLinks: INavigationLink[];
};

interface INavigationLink {
   component: JSX.Element;
   pathname: string;
   label: string;
   position?: number;
   current?: boolean;
};

const NavigationBar = ({ navigationLinks }: INavigationBarProps) => {
   const links = navigationLinks.map((navLink) => (
      <Link
         to={navLink.pathname}
         id={navLink.current ? 'current-link' : null}
         key={navLink.pathname}
         className='text-container clickable'
      >
         <h4>{navLink.label}</h4>
      </Link>
   ));

   return (
      <nav className='container'>
         {links}
      </nav>
   );
};

export {
   INavigationLink,
};

export default NavigationBar;

