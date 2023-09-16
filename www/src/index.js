'use strict';

import _ from 'regenerator-runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Portfolio from './components/Portfolio';

import './index.css';

const env = process.env.NODE_ENV;
if (env === 'development') {
   console.log(`Running in ${env} mode!`);
} else {
   // Disable console in production
   console.log = () => { };
   console.info = () => { };
   console.warn = () => { };
   console.debug = () => { };
   console.error = () => { };
}

ReactDOM.render(
   <React.StrictMode>
      <BrowserRouter>
         <Portfolio />
      </BrowserRouter>
   </React.StrictMode>,
   document.getElementById('root')
);

