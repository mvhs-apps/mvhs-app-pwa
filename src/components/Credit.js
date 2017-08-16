//@ flow weak
import { Component } from 'react';
import * as React from 'react';
import './Credit.css';

import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styleSheet = createStyleSheet(theme => ({
  card: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary
  }
}));

function SimpleCard(props) {
  const classes = props.classes;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          {/* <CardMedia> */}
          {/* <img src={reptileImage} alt="Contemplative Reptile" /> */}
          {/* </CardMedia> */}
          <Typography type="body1" className={classes.title}>
            Role 1
          </Typography>
          <Typography type="headline" component="h2">
            Name
          </Typography>
          <Typography type="body1" className={classes.pos}>
            adjective
          </Typography>
          <Typography component="p">
            well meaning and kindly.<br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button dense>Learn More</Button>
        </CardActions>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="body1" className={classes.title}>
            Role 2
          </Typography>
          <Typography type="headline" component="h2">
            Name
          </Typography>
          <Typography type="body1" className={classes.pos}>
            adjective
          </Typography>
          <Typography component="p">
            well meaning and kindly.<br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button dense>Learn More</Button>
        </CardActions>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="body1" className={classes.title}>
            Role 3
          </Typography>
          <Typography type="headline" component="h2">
            Name
          </Typography>
          <Typography type="body1" className={classes.pos}>
            adjective
          </Typography>
          <Typography component="p">
            well meaning and kindly.<br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button dense>Learn More</Button>
        </CardActions>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="body1" className={classes.title}>
            Role 4
          </Typography>
          <Typography type="headline" component="h2">
            Name
          </Typography>
          <Typography type="body1" className={classes.pos}>
            adjective
          </Typography>
          <Typography component="p">
            well meaning and kindly.<br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button dense>Learn More</Button>
        </CardActions>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="body1" className={classes.title}>
            Role 5
          </Typography>
          <Typography type="headline" component="h2">
            Name
          </Typography>
          <Typography type="body1" className={classes.pos}>
            adjective
          </Typography>
          <Typography component="p">
            well meaning and kindly.<br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button dense>Learn More</Button>
        </CardActions>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="body1" className={classes.title}>
            Role 6
          </Typography>
          <Typography type="headline" component="h2">
            Name
          </Typography>
          <Typography type="body1" className={classes.pos}>
            adjective
          </Typography>
          <Typography component="p">
            well meaning and kindly.<br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button dense>Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styleSheet)(SimpleCard);
