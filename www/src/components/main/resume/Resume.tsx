import React from 'react';

import './Resume.css';

const Resume = () => {
   return (
      <div id='resume' className='container'>
         <iframe id='resume-pdf' src='ZacharySilverResume.pdf' />
      </div>
   );
};

export default Resume;

