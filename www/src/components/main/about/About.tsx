import React, { useState } from 'react';
import {
   faGuitar,
   faTerminal,
   faGamepad,
} from '@fortawesome/free-solid-svg-icons';

import { GameOfLife } from '../../../canvas/GameOfLife';
import { useCanvas } from '../../common/util';
import TerminalText from '../../common/TerminalText';
import {
   getTypingRate,
   getDocumentStyle,
   getWindowProperties
} from '../../../common/util';
import Hobby from './Hobby';

import './About.css';

const PIXELS_PER_CELL = 4;

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
].map((paragraph, index) => (
   <p key={index} className='bio-paragraph'>{paragraph}</p>
));

const HOBBIES = Object.entries({
   'Guitar': `
I started teaching myself how to play guitar in 2015 and I'm always learning
how to play new songs. I love playing the blues and Jimi Hendrix is my all time
favorite guitarist.
`,
   'Programming': `
In addition to being my profession, I have the privilege of calling
programming a hobby of mine. I love staying up to date with current
technologies and practices in the software development space and I'm constantly
developing new personal projects.
`,
   'Video Games': `
For better or for worse, my older brother handing me that GameBoy marked the
beginning of my time as a gamer. From Pokémon, RuneScape, and World of Warcraft,
to Call of Duty and Battlefield, I've spent thousands of hours throughout my life
playing games like these.
`,
}).map(([hobby, description], index) => (
   <Hobby
      key={index}
      name={hobby}
      description={description}
      icon={{
         'Guitar': faGuitar,
         'Programming': faTerminal,
         'Video Games': faGamepad,
      }[hobby] as any}
   />
));

const About = () => {
   const documentStyle = getDocumentStyle();
   const { height, width } = getWindowProperties();
   const [gameOfLife, _] = useState(() => new GameOfLife({
      rows: Math.ceil(height / PIXELS_PER_CELL + PIXELS_PER_CELL),
      columns: Math.ceil(width / PIXELS_PER_CELL + PIXELS_PER_CELL),
      pixelsPerCell: PIXELS_PER_CELL,
      liveCellColor: documentStyle.getPropertyValue('--light-blue'),
      deadCellColor: documentStyle.getPropertyValue('--main-bg-color'),
      canvasId: 'canvas',
   }));
   useCanvas(gameOfLife, '0.3');

   return (
      <div id='about' className='container'>
         <div id='bio' className='container'>
            <h4 id='bio-description' className='description text-container'>
               <span>
                  {'> Bio.exe'}
                  {<TerminalText text={''} rate={getTypingRate('')} />}
               </span>
            </h4>
            <div id='bio-paragraphs-container' className='text-container'>
               <div id='bio-paragraphs'>
                  {BIO_PARAGRAPHS}
               </div>
            </div>
         </div>
         <div id='hobbies' className='container'>
            <h4 className='description text-container'>
               <span>
                  {'> Hobbies.exe'}
                  {<TerminalText text={''} rate={getTypingRate('')} />}
               </span>
            </h4>
            {HOBBIES}
         </div>
      </div>
   );
};

export default About;

