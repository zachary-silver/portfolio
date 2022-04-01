import { useEffect, useRef } from 'react';

import { ICanvas } from '../../canvas/Canvas';
import { showCanvas } from '../../common/util';

const usePrevious = (value: any) => {
   const ref = useRef();

   useEffect(() => {
      ref.current = value;
   }, [value]);

   return ref.current;
};

const useCanvas = (canvas: ICanvas, opacity: string) => {
   useEffect(() => {
      // Gives time for other canvas renders to finish.
      const timeoutId = setTimeout(() => {
         canvas.initializeCanvas();
         canvas.startRendering();
         showCanvas(opacity);
      }, 10);

      return () => {
         clearTimeout(timeoutId);
         canvas.stopRendering();
      };
   }, [canvas]);
};

export {
   usePrevious,
   useCanvas,
};

