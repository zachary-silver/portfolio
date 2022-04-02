import React from 'react';

import './Project.css';

interface IProjectProps {
   name: string,
   imageSrc: string,
};

const Project = ({ name, imageSrc }: IProjectProps) => {
   return (
      <div id='project' className='container'>
         <div id='project-name-container'>
            <h4 id='project-name' className='text-container'>{name}</h4>
         </div>
         <img id='project-image' src={imageSrc} />
      </div>
   );
};

export {
   IProjectProps,
};

export default Project;

