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
      setIndex(index === 0 ? components.length - 1 : index - 1);
   };

   const scrollRight = () => {
      setIndex((index + 1) % components.length);
   };

   return (
      <div id='scroll' className='container'>
         <button id='scroll-left' onClick={scrollLeft}>
            <FontAwesomeIcon id='caret-left' icon={faCaretLeft as any} />
         </button>
         {components[index]}
         <button id='scroll-right' onClick={scrollRight}>
            <FontAwesomeIcon id='caret-right' icon={faCaretRight as any} />
         </button>
      </div>
   );
};

export {
   IScrollProps,
};

export default Scroll;

