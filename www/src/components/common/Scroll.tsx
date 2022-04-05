import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faCaretLeft,
   faCaretRight,
} from '@fortawesome/free-solid-svg-icons';

import './Scroll.css';

interface IScrollProps {
   components: JSX.Element[];
};

const Scroll = ({ components }: IScrollProps) => {
   const [index, setIndex] = useState(0);

   const scrollLeft = () => {
      setIndex((components.length + index - 1) % components.length);
   };

   const scrollRight = () => {
      setIndex((index + 1) % components.length);
   };

   const children = components.map(
      (component) => <div className='component'>{component}</div>
   );

   useEffect(() => {
      const element = document.getElementsByClassName('component')[index];
      element.scrollIntoView({ behavior: 'smooth', inline: 'center' });
   }, [index]);

   return (
      <div id='scroll' className='container'>
         <button
            id='scroll-left'
            className='text-container clickable'
            onClick={scrollLeft}
         >
            <FontAwesomeIcon id='caret-left' icon={faCaretLeft as any} />
         </button>
         <div id='components' className='container'>
            {children}
         </div>
         <button
            id='scroll-right'
            className='text-container clickable'
            onClick={scrollRight}
         >
            <FontAwesomeIcon id='caret-right' icon={faCaretRight as any} />
         </button>
      </div>
   );
};

export {
   IScrollProps,
};

export default Scroll;

