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
      treeColor: DOCUMENT_STYLE.getPropertyValue('--main-text-color'),
   }));
   const [grown, setGrown] = useState(false);

   useEffect(() => {
      if (grown) {
         render = true;
         renderTree();

         return () => {
            render = false;
            document.getElementById('canvas').style.opacity = '0';
         };
      } else {
         document.getElementById('canvas').style.opacity = '0.5';

         growTree();
      }
   }, [grown]);

   const growTree = () => {
      let order = 1;

      const grow = () => {
         if (order < MAX_TREE_ORDER) {
            tree.render(
               WIDTH / 2,
               HEIGHT / 2,
               order++
            );
            setTimeout(grow, 50);
         } else {
            setGrown(true);
         }
      };

      grow();
   };

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

