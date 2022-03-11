import React, { useEffect } from 'react';

import { transitionIn, transitionOut } from './util';

interface IWithTransitionProps {
   children: any,
   className: string,
};

const WithTransition = ({ children, className }: IWithTransitionProps) => {
   useEffect(() => {
      transitionIn(className);

      return () => transitionOut(className);
   }, []);

   return (
      <React.Fragment>
         {children}
      </React.Fragment>
   );
};

const withTransition = (Component: React.ComponentType, className: string) => {
   const componentWithTransition = ({ ...props }) => (
      <WithTransition className={className}>
         <Component {...props} />
      </WithTransition>
   );
   componentWithTransition.displayName =
      `WithTransition(${getDisplayName(Component)})`;

   return componentWithTransition;
};

const getDisplayName = (Component: React.ComponentType) => {
   return Component.displayName || Component.name || 'Component';
};

export {
   withTransition,
   IWithTransitionProps,
};

export default WithTransition;

