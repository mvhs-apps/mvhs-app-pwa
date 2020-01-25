//@ flow

import * as React from 'react';
import CreditsContainer from '../containers/CreditsContainer';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import './AboutPage.css';

const AboutPage = () => {
  return (
    <div>
      <div className="about-club center">
        <Typography type="title" align="center" className="about-club-title">
          MVHS Computer Science Club
        </Typography>
        <Typography type="body1" align="center" className="about-club-desc">
          Join us to help develop this app and others for the MVHS community! No
          programming experience necessary. Meetings are held Monday at lunch in
          Room P4.
        </Typography>
        <Button
          className=""
          href="http://club.mvhs.io"
          target="_blank"
          rel="noopener noreferrer"
          color="accent"
        >
          club.mvhs.io
        </Button>
        <Button
          className="center"
          href="https://github.com/mvhs-apps/mvhs-app-pwa"
          target="_blank"
          rel="noopener noreferrer"
          color="accent"
        >
          GitHub
        </Button>
      </div>
      <CreditsContainer />
    </div>
  );
};

export default AboutPage;
