import React, { useEffect } from 'react';

const Work = () => {
   useEffect(() => {
      document.getElementById('universe-canvas').style.opacity = '0.5';

      return () => {
         document.getElementById('universe-canvas').style.opacity = '0';
      };
   }, []);

   return (
      <div />
   );
}

export default Work;

