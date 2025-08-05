const Blurcircle = ({ top, right, bottom, left }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: top || 'auto',
        right: right || 'auto',
        bottom: bottom || 'auto',
        left: left || 'auto',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.1)',
        filter: 'blur(50px)',
        zIndex: -1,
      }}
    />
  );
};

export default Blurcircle;

// import React from 'react';

// const Blurcircle = ({ top = "auto", left = "auto", right = "auto", bottom = "auto" }) => {
//   return (
//     <div
//       className="absolute -z-50 h-56 w-56 aspect-square rounded-full bg-primary/30 blur-2xl"
//       style={{ top, left, right, bottom }}
//     ></div>
//   );
// };

// export default Blurcircle;
