import React, { useState } from 'react';

import { FractalTree } from '../../../canvas/FractalTree';
import { useCanvas } from '../../common/util';
import {
   DOCUMENT_STYLE,
   VIEWPORT_HEIGHT,
   VIEWPORT_WIDTH,
} from '../../../common/constants';
import TerminalText from '../../common/TerminalText';
import { getTypingRate } from '../../../common/util';
import Hobby from './Hobby';

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
};

// const bioParagraphs = BIO_PARAGRAPHS.map(
//    (paragraph, index) => <p key={index}>{paragraph}</p>
// );

const bioParagraphs = BIO_PARAGRAPHS.reduce(
   (prev, curr) => prev + ' ' + curr,
   ''
);

const hobbies = Object.entries(HOBBIES).map(
   ([hobby, description], index) => (
      <li key={index}>
         <h5>{hobby}</h5>
         <p className='hobby-description'>{description}</p>
      </li>
   )
);

const About = () => {
   const [tree, _] = useState(() => new FractalTree({
      positions: [
         {
            x: VIEWPORT_WIDTH / 4,
            y: VIEWPORT_HEIGHT,
         },
         {
            x: VIEWPORT_WIDTH - VIEWPORT_WIDTH / 4,
            y: VIEWPORT_HEIGHT,
         },
      ],
      height: VIEWPORT_HEIGHT,
      width: VIEWPORT_WIDTH,
      branchLength: VIEWPORT_HEIGHT / 5,
      branchWidth: 10,
      startingAngle: 8,
      endingAngle: 45,
      maxDepth: 10,
      treeColor: DOCUMENT_STYLE.getPropertyValue('--light-blue'),
   }));
   useCanvas(tree, '0.5');
   const [showBio, setShowBio] = useState(false);
   const [showHobbies, setShowHobbies] = useState(false);

   return (
      <div id='about' className='container'>
         <div id='bio' className='container'>
            <button
               id='bio-button'
               onClick={() => setShowBio(!showBio)}
               className='text-container'
            >
               <h2 className='description'>
                  <span>{'> Bio.exe'}{!showBio && <TerminalText text={''} rate={getTypingRate('')} />}</span>
               </h2>
            </button>
            {showBio &&
               <div id='bio-paragraphs' className='text-container'>
                  {'> '}<TerminalText text={bioParagraphs} rate={getTypingRate(bioParagraphs)} />
               </div>
            }
         </div>
         <div id='hobbies' className='container'>
            <button
               id='bio-button'
               onClick={() => setShowHobbies(!showHobbies)}
               className='text-container'
            >
               <h2 className='description'>
                  <span>{'> Hobbies.exe'}{!showHobbies && <TerminalText text={''} rate={getTypingRate('')} />}</span>
               </h2>
            </button>
            <div className='text-container'>
               <ul id='hobbies-list'>
                  {hobbies}
               </ul>
            </div>
            <Hobby description={HOBBIES['Guitar']} imageSrc={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHNj1sugtt-8Pq7MIYl2YG75PT5EeqSbM75ioeIH5IghTBEOkNuy_9jwVgopsUqurnh4g&usqp=CAU'} />
         </div>
      </div>
   );
};

export default About;

