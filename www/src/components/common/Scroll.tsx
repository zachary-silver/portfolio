import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   fa0,
   faCaretLeft,
   faCaretRight,
} from '@fortawesome/free-solid-svg-icons';

import { CSSTransition } from 'react-transition-group';
import { usePrevious } from './util';

import './Scroll.css';

interface IScrollProps {
   components: JSX.Element[];
};

const navigatedLeft = (current: number, previous?: number) => {
   return previous && (current < previous || current === 0);
};

const getClassNames = (current: number, previous?: number) => {
   return navigatedLeft(current, previous) ? 'scroll-reverse' : 'scroll';
};

const Scroll = ({ components }: IScrollProps) => {
   const [index, setIndex] = useState(0);
   const [classNames, setClassNames] = useState('main');
   const [showComponent, setShowComponent] = useState(true);
   const [component, setComponent] = useState(components[0]);
   const [scrolling, setScrolling] = useState(false);
   const nodeRef = useRef(null);

   const previousIndex: number = usePrevious(index);
   useEffect(() => {
      if (components[index] === component) {
         return;
      }

      setShowComponent(false);
      setClassNames(getClassNames(index, previousIndex));

      const timeoutId = setTimeout(() => {
         setComponent(components[index]);
         setShowComponent(true);
         setScrolling(false);
      }, 300);

      return () => clearTimeout(timeoutId);
   }, [index]);

   const scrollLeft = () => {
      setScrolling(true);
      setIndex((components.length + index - 1) % components.length);
   };

   const scrollRight = () => {
      setScrolling(true);
      setIndex((index + 1) % components.length);
   };

   return (
      <div id='scroll' className='container'>
         <button
            id='scroll-left-button'
            className='text-container clickable'
            onClick={scrollLeft}
            disabled={scrolling}
         >
            <FontAwesomeIcon id='caret-left' icon={faCaretLeft as any} />
         </button>
         <CSSTransition
            in={showComponent}
            timeout={500}
            classNames={classNames}
            nodeRef={nodeRef}
            unmountOnExit
         >
            <div ref={nodeRef}>
               {component}
            </div>
         </CSSTransition>
         <button
            id='scroll-right-button'
            className='text-container clickable'
            onClick={scrollRight}
            disabled={scrolling}
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

