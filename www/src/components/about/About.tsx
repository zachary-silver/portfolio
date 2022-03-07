import React from 'react';

import './About.css';

const ABOUT_ME_TEXT = `
I'm a fourth year Computer Science student attending Cal Poly in
San Luis Obispo, CA. My older brother handed me his GameBoy Color when
I was six years old, sparking an unprecedented fascination with technology
which has yet to fade away. I started experimenting with and building
computers for fun by the time I was 14. I've been programming for work,
school, and for fun ever since I wrote my first "Hello World" program in
2015 and wouldn't have it any other way.
`;

const About = () => {
   return (
      <div id='about' className='text-container'>
         <p id='about-me-text'>{ABOUT_ME_TEXT}</p>
      </div>
   );
};

export default About;

