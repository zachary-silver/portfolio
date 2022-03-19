'use strict';

import _ from "regenerator-runtime";

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Portfolio from './components/Portfolio';

import './index.css';

import { TreeOfPythagoras } from './tree-of-pythagoras/TreeOfPythagoras';

const PIXELS_PER_CELL = 1;
const HEIGHT = Math.ceil(
   window.screen.height * window.devicePixelRatio / PIXELS_PER_CELL
);
const WIDTH = Math.ceil(
   window.screen.width * window.devicePixelRatio / PIXELS_PER_CELL
);
const DOCUMENT_STYLE = getComputedStyle(document.documentElement);

const tree = new TreeOfPythagoras({
   rows: HEIGHT,
   columns: WIDTH,
   pixelsPerCell: PIXELS_PER_CELL,
   treeColor: DOCUMENT_STYLE.getPropertyValue('--main-text-color'),
   backgroundColor: DOCUMENT_STYLE.getPropertyValue('--main-bf-color'),
});

// onmousemove = (event) => tree.render(event.clientX, event.clientY);

tree.render(500, 500);

// ReactDOM.render(
//    <React.StrictMode>
//       <BrowserRouter>
//          <Portfolio />
//       </BrowserRouter>
//    </React.StrictMode>,
//    document.getElementById('root')
// );

