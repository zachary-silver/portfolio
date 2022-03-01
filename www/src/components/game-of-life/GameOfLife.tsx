import React, { useRef, useEffect } from 'react';

import Universe from '../../game-of-life/Universe';

const GameOfLife: () => React.ReactElement = () => {
   const universeRef = useRef(new Universe(512, 1024));

   useEffect(() => {
      universeRef.current.render();
   }, []);

   return null;
};

export default GameOfLife;

