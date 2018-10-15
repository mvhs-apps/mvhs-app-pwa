//@ flow

import React from 'react';

import creditsData from '../assets/links.json';

import LinksCss from '../components/LinksCss';

class LinkContainer extends React.PureComponent {
  render() {
    return <LinksCss profiles={creditsData} />;
  }
}

export default LinkContainer;
