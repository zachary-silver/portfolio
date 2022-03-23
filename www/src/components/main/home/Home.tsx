import React, { useState, useEffect } from 'react';

import { TreeOfPythagoras } from '../../../canvas/TreeOfPythagoras';
import { showCanvas } from '../../common/Util';
import {
   DOCUMENT_STYLE,
   VIEWPORT_HEIGHT,
   VIEWPORT_WIDTH
} from '../../../common/util';

import Author from './Author';
import Greeting from './Greeting';

import './Home.css';

const Home = () => {
   const [tree, _] = useState(() => new TreeOfPythagoras({
      height: VIEWPORT_HEIGHT,
      width: VIEWPORT_WIDTH,
      trunkWidth: VIEWPORT_WIDTH / 11,
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

