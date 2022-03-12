import React, { useEffect } from 'react';

interface IWithTransitionProps {
   id: string,
   children: any,
   className: string,
};

const WithTransition = ({ id, children, className }: IWithTransitionProps) => {
   useEffect(() => {
      document.getElementById(id).classList.add(className);

      return () => {
         document.getElementById(id).classList.remove(className);
      };
   }, []);

   return (
      <React.Fragment>
         {children}
      </React.Fragment>
   );
};

const withTransition = (Component: React.ComponentType, id: string, className: string) => {
   const componentWithTransition = ({ ...props }) => (
      <WithTransition id={id} className={className}>
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

