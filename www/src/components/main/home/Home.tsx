import React, { useState } from 'react';

import { TreeOfPythagoras } from '../../../canvas/TreeOfPythagoras';
import { getWindowProperties } from '../../../common/util';
import { useCanvas } from '../../common/util';

import Author from './Author';
import Greeting from './Greeting';

import './Home.css';

const Home = () => {
   const { height, width } = getWindowProperties();
   const [tree, _] = useState(() => new TreeOfPythagoras({
      height,
      width,
      trunkWidth: width / 11,
      maxDepth: 9,
      treeColor: {
         red: '104',
         green: '167',
         blue: '212'
      },
      canvasId: 'canvas',
   }));
   useCanvas(tree, '0.5');

   return (
      <div id='home' className='container'>
         <Author />
         <Greeting />
      </div>
   );
};

export default Home;

