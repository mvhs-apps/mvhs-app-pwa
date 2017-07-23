import * as React from 'react';

import { createStyleSheet, withStyles } from 'material-ui/styles';
import BottomNavigation, {
  BottomNavigationButton
} from 'material-ui/BottomNavigation';
import RestoreIcon from 'material-ui-icons/Restore';
import FavoriteIcon from 'material-ui-icons/Favorite';
import LocationOnIcon from 'material-ui-icons/LocationOn';
import { Component } from 'react';

const styleSheet = createStyleSheet('SimpleBottomNavigation', {
  root: {
    width: 500
  }
});

class SimpleBottomNavigation extends Component {
  state = {
    value: 0
  };

  handleChange = (event: any, value: any) => {
    this.setState({ value });
  };

  render() {
    // const classes = this.props.classes;
    const classes = { root: 'App' };
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels="true"
        >
          <BottomNavigationButton label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationButton label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationButton label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </div>
    );
  }
}

export default withStyles(styleSheet)(SimpleBottomNavigation);
