// @flow

import * as React from 'react';

import SVGImage from './SVGImage.native';
import map from './schoolMap.native';
import { View } from 'react-native';

const Map = () => (
  <View style={{ flex: 1 }}>
    <SVGImage style={{ flex: 1 }} svgString={map} />
  </View>
);

export default Map;
