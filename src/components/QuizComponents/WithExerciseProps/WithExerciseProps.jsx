
import React from 'react';

const WithExerciseProps = ({ children, ...sharedProps }) => {
  return (
    <>
      {React.Children.map(children, child => {
        // verifica che sia un React element valido
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { ...sharedProps });
        }
        return child; // fallback se non è un React element
      })}
    </>
  );
};

export default WithExerciseProps;