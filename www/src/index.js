'use strict';

import _ from 'regenerator-runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Portfolio from './components/Portfolio';

import './index.css';

console.log(`Running in ${process.env.NODE_ENV} mode!`);

ReactDOM.render(
   <React.StrictMode>
      <BrowserRouter>
         <Portfolio />
      </BrowserRouter>
   </React.StrictMode>,
   document.getElementById('root')
);

