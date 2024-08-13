// components/SplineScene.js

import React from 'react';

const Splinescene = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <iframe
        src="https://my.spline.design/3drobot-eee2fa61bfa3c2da259b130a742dab3e/"
        style={{ width: '100%', height: '100%', border: 'none', background: '#000000'}}
        allow="fullscreen"
        title="3D Scene"
      ></iframe>
    </div>
  );
};

export default Splinescene;
