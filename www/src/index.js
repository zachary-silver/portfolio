'use strict';

import regeneratorRuntime from "regenerator-runtime";

import { Universe } from './game-of-life/Universe';

import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import Portfolio from './components/Portfolio';

const PIXELS_PER_CELL = 4;

const UNIVERSE = new Universe({
   rows: window.screen.height * window.devicePixelRatio / PIXELS_PER_CELL,
   columns: window.screen.width * window.devicePixelRatio / PIXELS_PER_CELL,
   pixelsPerCell: PIXELS_PER_CELL,
   liveCellColor: "#e8e8e8",
   deadCellColor: "#232731",
});

UNIVERSE.render();

ReactDOM.render(
   <React.StrictMode>
      <Portfolio />
   </React.StrictMode>,
   document.getElementById('root')
);

