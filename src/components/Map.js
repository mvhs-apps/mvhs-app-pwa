import React from 'react';

import map from '../assets/schoolmap.svg';

import './Map.css';

const Map = () => {
  return (
    <div className="map-container">
      <img alt="map" className="map" src={map} />
    </div>
  );
};

export default Map;
