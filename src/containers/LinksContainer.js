//@ flow

import React from 'react';

import creditsData from '../assets/credits.json';

import Links from '../components/Links';

class LinksContainer extends React.PureComponent {
  render() {
    return <Links profiles={creditsData} />;
  }
}

export default LinksContainer;
