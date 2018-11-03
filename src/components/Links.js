//@ flow

import * as React from 'react';
import LinkContainer from '../containers/LinkContainer';
//import CreditsContainer from '../containers/CreditsContainer';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import './Links.css';

const Links = () => {
  return (
    <div>
      <div className="about-club center" />
      <LinkContainer />
    </div>
  );
};

export default Links;
