// components/SplineScene.js

import React from 'react';

const SplineScene = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
      <iframe
        src="https://my.spline.design/robotfollowcursorforlandingpage-b7f8aab42b96f3ba93c0cbc0fa268987/"
        style={{ width: '100%', height: '100%', border: 'none', background: '#000000'}}
        allow="fullscreen"
        title="3D Scene"
      ></iframe>
    </div>
  );
};

export default SplineScene;
