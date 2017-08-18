import React from 'react';

import map from '../assets/schoolmap.svg';

import './Map.css';

const Map = () => {
  return (
    <div>
      <img alt="map" className="schoolmap" src={map} />
    </div>
  );
};

export default Map;
