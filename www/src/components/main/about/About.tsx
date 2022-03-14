import React from 'react';

import './About.css';

const BIO_PARAGRAPHS = [
   `
In 2021, I graduated with a B.S. in Computer Science from California
Polytechnic State University in San Luis Obispo, CA and started my
professional career as a software developer working at Amazon.
   `,
   `
When I was 6 years old, my older brother handed me his GameBody Color,
sparking an unprecedented facination with technology which has yet to fade.
By the time I was 14, I was experimenting with operating systems,
playing with any software I could get my hands on, and building computers for fun.
   `,
   `
I've been developing software for school, work, and fun ever since I wrote my first
"Hello, World!" program in 2015 and wouldn't have it any other way.
   `
];

const HOBBIES_PARAGRAPHS = [
   `guitar`,
   `programming`,
   `video games`,
];

const About = () => {
   return (
      <div id='about' className='container'>
         <div id='bio' className='container text-container about-text'>
            <h4 id='description'>Bio</h4>
            {BIO_PARAGRAPHS.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
         </div>
         <div id='hobbies' className='container text-container about-text'>
            <h4 id='description'>Hobbies</h4>
            {HOBBIES_PARAGRAPHS.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
         </div>
      </div>
   );
};

export default About;

