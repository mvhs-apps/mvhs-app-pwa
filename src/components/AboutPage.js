//@ flow

import React from 'react';
import CreditsContainer from '../containers/CreditsContainer';
import Typography from 'material-ui/Typography';

import './AboutPage.css';

const AboutPage = () => {
  return (
    <div>
      <div className="about-club">
        <Typography type="title" align="center" className="about-club-title">
          MVHS Computer Science Club
        </Typography>
        <Typography type="subheading" align="center">
          <a
            href="http://club.mvhs.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            club.mvhs.io
          </a>
        </Typography>
      </div>
      <CreditsContainer />
    </div>
  );
};

export default AboutPage;
