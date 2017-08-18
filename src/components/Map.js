import React from 'react';

import map from '../assets/SchoolMap.JPG';

import './Map.css';

const Map = () => {
  return (
    <div>
      <img alt="map" className="schoolmap" src={map} />
    </div>
  );
};

export default Map;
