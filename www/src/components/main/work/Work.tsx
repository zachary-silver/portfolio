import React, { useEffect } from 'react';

const Work = () => {
   useEffect(() => {
      document.getElementById('universe-canvas').style.opacity = '0.5';

      return () => {
         document.getElementById('universe-canvas').style.opacity = '0';
      };
   }, []);

   return (
      <div id='work' className='container'>
         <p className='text-container'>My Work</p>
      </div>
   );
}

export default Work;

