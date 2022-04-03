import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Hobby.css';

interface IHobbyProps {
   name: string,
   description: string,
   icon: IconDefinition,
};

const Hobby = ({ description, icon }: IHobbyProps) => {
   return (
      <div id='hobby' className='container'>
         <FontAwesomeIcon
            id='hobby-icon'
            icon={icon}
            className='text-container'
         />
         <p className='text-container'>
            {description}
         </p>
      </div>
   );
};

export {
   IHobbyProps,
};

export default Hobby;

