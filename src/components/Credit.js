//@ flow

import React from 'react';

import './Credit.css';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const SimpleCard = props => {
  return (
    <div className="about">
      <Card>
        <CardContent>
          <Typography type="headline" component="h2">
            Daniel Ciao
          </Typography>
          <Typography type="body1" className="about-subtitle">
            Lead Developer
          </Typography>
          <Typography component="p">
            Overall app framework and design
          </Typography>
        </CardContent>
        <CardActions>
          <Button dense>Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default SimpleCard;
