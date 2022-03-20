import React, { useState, useEffect } from 'react';

import { GameOfLife } from '../../../canvas/GameOfLife';
import { showCanvas } from '../../common/Util';

import './About.css';

const BIO_PARAGRAPHS = [
   `
I graduated with a B.S. in Computer Science from California
Polytechnic State University in San Luis Obispo, CA in 2021 and began my
professional career as a software developer working at Amazon.
   `,
   `
When I was 6 years old, my older brother Zane handed me his GameBoy Color,
sparking an unprecedented fascination with technology which has yet to fade.
By the time I was 14, I was playing with numerous operating systems,
experimenting with any software I could get my hands on, and building
computers for fun.
   `,
   `
I've been developing software for school, work, and fun ever since I wrote my first
"Hello, World!" program in 2015 and wouldn't have it any other way.
   `
];

const HOBBIES: { [key: string]: string } = {
   'Guitar': `
I started teaching myself how to play guitar in 2015 and constantly aspire to
get better. I love playing the blues and Jimi Hendrix is my all time favorite
guitarist.
`,
   'Programming': `
In addition to being my profession, I have the privilege of calling
programming a hobby of mine. I love staying up to date with current
technologies and practices in the software development space. I'm constantly
working on new personal projects and exploring unfamiliar technologies.
`,
   'Video Games': `
For better or for worse, my older brother handing me that GameBoy marked the
beginning of my time as a gamer. From Pokémon, RuneScape, and World of Warcraft,
to Call of Duty and Battlefield, I've spent thousands of hours throughout my life
learning and mastering how to play these games to the best of my ability.
`,
};

const PIXELS_PER_CELL = 4;
const ROWS = Math.ceil(
   window.screen.height * window.devicePixelRatio / PIXELS_PER_CELL
);
const COLUMNS = Math.ceil(
   window.screen.width * window.devicePixelRatio / PIXELS_PER_CELL
);
const DOCUMENT_STYLE = getComputedStyle(document.documentElement);

const About = () => {
   const [gameOfLife, _] = useState(() => new GameOfLife({
      rows: ROWS,
      columns: COLUMNS,
      pixelsPerCell: PIXELS_PER_CELL,
      liveCellColor: DOCUMENT_STYLE.getPropertyValue('--ice'),
      deadCellColor: DOCUMENT_STYLE.getPropertyValue('--main-bg-color'),
   }));

   useEffect(() => {
      // Gives time for other canvas renders to finish.
      const timeoutId = setTimeout(() => {
         gameOfLife.initializeCanvas();
         gameOfLife.startRendering();
         showCanvas('0.2');
      }, 10);

      return () => {
         clearTimeout(timeoutId);
         gameOfLife.stopRendering();
      };
   }, []);
   return (
      <div id='about' className='container'>
         <div id='bio' className='container text-container about-text'>
            <h4 className='description'>Bio</h4>
            {BIO_PARAGRAPHS.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
         </div>
         <div id='hobbies' className='container text-container about-text'>
            <h4 className='description'>Hobbies</h4>
            <ul id='hobbies-list'>
               {Object.entries(HOBBIES).map(([hobby, description], index) => {
                  return (
                     <li key={index} id='hobby'>
                        <h5>{hobby}</h5>
                        <p id='hobby-description'>{description}</p>
                     </li>
                  );
               })}
            </ul>
         </div>
      </div>
   );
};

export default About;

