import React from 'react';

import Project, { IProjectProps } from './Project';

const Work = () => {
   return (
      <div id='work' className='container'>
         <Project name={'System Status Monitor'} imageSrc={'http://zmansilver.com/assets/images/projects/dwmstatus.jpg'} />
      </div>
   );
};

export default Work;

