//@ flow

import React from 'react';

import creditsData from '../assets/credits.json';

import type Profile from '../components/Credits';
import Credits from '../components/Credits';

class CreditsContainer extends React.PureComponent {
  render() {
    return <Credits profiles={creditsData} />;
  }
}

export default CreditsContainer;
