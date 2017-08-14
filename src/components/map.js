import { Component } from 'react';
import * as React from 'react';

import map from '../assets/SchoolMap.JPG';

import './map.css';

class Map extends Component {
  onDocumentLoad({ total }) {
    this.setState({ total });
  }

  onPageLoad() {}

  render() {
    return (
      <div>
        <img alt="map" className="schoolmap" src={map} />
      </div>
    );
  }
}

export default Map;
