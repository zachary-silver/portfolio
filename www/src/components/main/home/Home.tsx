import React from 'react';

import Author from './Author';
import Greeting from './Greeting';

import './Home.css';

const Home = () => {
   return (
      <div id='home' className='container'>
         <Author />
         <Greeting />
      </div>
   );
};

export default Home;

