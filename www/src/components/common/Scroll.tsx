import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faCaretLeft,
   faCaretRight,
} from '@fortawesome/free-solid-svg-icons';

import './Scroll.css';

interface IScrollProps {
   components: JSX.Element[];
};

const addMarginStyling = (components: number) => {
   const margin = 25;
   const firstMargin = margin * 4 * components - margin * 3;
   const styleSheet = document.styleSheets[0];

   return [
      `#first-scroll-component { margin-left: ${firstMargin}vw; }`,
      `.scroll-component { margin-left: ${margin}vw; margin-right: ${margin}vw; }`,
   ].map((rule) => styleSheet.insertRule(rule));
};

const Scroll = ({ components }: IScrollProps) => {
   const [index, setIndex] = useState(0);
   const initializedRef = useRef(false);

   useEffect(() => {
      const ruleIndices = addMarginStyling(components.length);

      return () => {
         const styleSheet = document.styleSheets[0];
         ruleIndices.forEach((index) => styleSheet.deleteRule(index));
      };
   }, []);

   useEffect(() => {
      if (!initializedRef.current) {
         initializedRef.current = true;
         return;
      }

      const components = document.getElementsByClassName('scroll-component');
      components[index].scrollIntoView({
         behavior: 'smooth',
         inline: 'center',
         block: 'end'
      });
   }, [index]);

   const scrollLeft = () => {
      setIndex((components.length + index - 1) % components.length);
   };

   const scrollRight = () => {
      setIndex((index + 1) % components.length);
   };

   const children = components.map(
      (component, index) => (
         <div
            id={index === 0 ? 'first-scroll-component' : null}
            key={index}
            className='scroll-component'
         >
            {component}
         </div>
      )
   );

   return (
      <div id='scroll' className='container'>
         <button
            id='scroll-left-button'
            className='text-container clickable'
            onClick={scrollLeft}
         >
            <FontAwesomeIcon id='caret-left' icon={faCaretLeft as any} />
         </button>
         <div id='scroll-components' className='container'>
            {children}
         </div>
         <button
            id='scroll-right-button'
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

