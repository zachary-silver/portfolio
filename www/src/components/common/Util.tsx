import { useEffect, useRef } from 'react';

export const usePrevious = (value: any) => {
   const ref = useRef();

   useEffect(() => {
      ref.current = value;
   }, [value]);

   return ref.current;
}

export const showCanvas = (opacity: string) => {
   document.getElementById('canvas').style.opacity = opacity;
};

export const hideCanvas = () => {
   document.getElementById('canvas').style.opacity = '0';
};

