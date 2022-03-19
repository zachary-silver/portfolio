import React, { useState, useEffect } from 'react';

import { TreeOfPythagoras } from '../../../tree-of-pythagoras/TreeOfPythagoras';

import Author from './Author';
import Greeting from './Greeting';

import './Home.css';

const HEIGHT = Math.ceil(window.screen.height * window.devicePixelRatio);
const WIDTH = Math.ceil(window.screen.width * window.devicePixelRatio);
const DOCUMENT_STYLE = getComputedStyle(document.documentElement);
const TRUNK_WIDTH = WIDTH / 10;
const MAX_TREE_ORDER = 9;

interface IPosition {
   x: number,
   y: number,
};

let mousePosition: IPosition = {
   x: 0,
   y: 0,
};

onmousemove = (event) => {
   mousePosition.x = event.clientX;
   mousePosition.y = event.clientY;
};

let render: boolean;

const Home = () => {
   const [tree, _] = useState(() => new TreeOfPythagoras({
      height: HEIGHT,
      width: WIDTH,
      trunkWidth: WIDTH / 10,
      treeColor: DOCUMENT_STYLE.getPropertyValue('--ice'),
   }));

   useEffect(() => {
      const timeoutId = setTimeout(() => {
         render = true;
         renderTree();
         document.getElementById('canvas').style.opacity = '1.0';
      }, 400);

      return () => {
         document.getElementById('canvas').style.opacity = '0';
         clearTimeout(timeoutId);
         render = false;
      };
   }, []);

   const renderTree = () => {
      if (render) {
         tree.render(
            mousePosition.x,
            mousePosition.y + TRUNK_WIDTH,
            MAX_TREE_ORDER
         );
         setTimeout(renderTree, 10);
      }
   };

   return (
      <div id='home' className='container'>
         <Author />
         <Greeting />
      </div>
   );
};

export default Home;

