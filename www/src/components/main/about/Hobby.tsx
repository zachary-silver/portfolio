import React from 'react';

import TerminalText from '../../common/TerminalText';
import { getTypingRate } from '../../../common/util';

interface IHobbyProps {
   description: string,
   imageSrc: string,
};

const Hobby = ({ description, imageSrc }: IHobbyProps) => {
   return (
      <div id='hobby'>
         <img src={imageSrc} />
         <p className='text-container'>
            {'> '}<TerminalText text={description} rate={getTypingRate(description)} />
         </p>
      </div>
   );
};

export {
   IHobbyProps,
};

export default Hobby;

