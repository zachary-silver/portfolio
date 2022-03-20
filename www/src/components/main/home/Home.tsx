import React, { useState, useEffect } from 'react';

import { TreeOfPythagoras } from '../../../canvas/TreeOfPythagoras';
import { showCanvas } from '../../common/Util';

import Author from './Author';
import Greeting from './Greeting';

import './Home.css';

const HEIGHT = Math.ceil(window.screen.height * window.devicePixelRatio);
const WIDTH = Math.ceil(window.screen.width * window.devicePixelRatio);
const DOCUMENT_STYLE = getComputedStyle(document.documentElement);

const Home = () => {
   const [tree, _] = useState(() => new TreeOfPythagoras({
      height: HEIGHT,
      width: WIDTH,
      trunkWidth: WIDTH / 9,
      maxOrder: 9,
      treeColor: DOCUMENT_STYLE.getPropertyValue('--ice'),
   }));

   useEffect(() => {
      // Gives time for other canvas renders to finish.
      const timeoutId = setTimeout(() => {
         tree.initializeCanvas();
         tree.startRendering();
         showCanvas('0.5');
      }, 10);

      return () => {
         clearTimeout(timeoutId);
         tree.stopRendering();
      };
   }, []);

   return (
      <div id='home' className='container'>
         <Author />
         <Greeting />
      </div>
   );
};

export default Home;

