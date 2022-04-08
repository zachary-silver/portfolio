import React from 'react';

import './Project.css';

interface IProjectProps {
   name: string,
   url: string,
   imageSrc: string,
};

const Project = ({ name, url, imageSrc }: IProjectProps) => {
   return (
      <div id='project' className='container'>
         <a href={url} target={'_blank'}>
            <h4 id='project-name' className='text-container clickable'>
               {name}
            </h4>
            <img id='project-image' src={imageSrc} />
         </a>
      </div>
   );
};

export {
   IProjectProps,
};

export default Project;

