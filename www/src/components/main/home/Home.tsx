import React, { useState } from 'react';

import { TreeOfPythagoras } from '../../../canvas/TreeOfPythagoras';
import { useCanvas } from '../../common/Util';
import {
   DOCUMENT_STYLE,
   VIEWPORT_HEIGHT,
   VIEWPORT_WIDTH,
} from '../../../common/util';

import Author from './Author';
import Greeting from './Greeting';

import './Home.css';

const Home = () => {
   const [tree, _] = useState(() => new TreeOfPythagoras({
      height: VIEWPORT_HEIGHT,
      width: VIEWPORT_WIDTH,
      trunkWidth: VIEWPORT_WIDTH / 11,
      maxDepth: 9,
      treeColor: DOCUMENT_STYLE.getPropertyValue('--ice'),
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

