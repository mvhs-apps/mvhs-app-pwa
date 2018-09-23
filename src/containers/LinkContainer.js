//@ flow

import React from 'react';

import creditsData from '../assets/links.json';

import Credits from '../components/Credits';

class LinkContainer extends React.PureComponent {
  render() {
    return <Credits profiles={creditsData} />;
  }
}

export default LinkContainer;
