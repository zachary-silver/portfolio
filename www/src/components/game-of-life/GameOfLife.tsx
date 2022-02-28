import React, { useState, useEffect, useRef } from 'react';

import Universe from './Universe';

const GameOfLife: () => React.ReactElement = () => {
   const universeRef = useRef(new Universe(512, 1024));

   universeRef.current.render();

   return null;
};

export default GameOfLife;

