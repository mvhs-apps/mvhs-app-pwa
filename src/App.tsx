import * as React from 'react';
import { Component } from 'react';
import './App.css';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import BottomNavigation, {
  BottomNavigationButton
} from 'material-ui/BottomNavigation';
import RestoreIcon from 'material-ui-icons/Restore';
import FavoriteIcon from 'material-ui-icons/Favorite';
import LocationOnIcon from 'material-ui-icons/LocationOn';
import 'typeface-roboto';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import BellSchedule from './components/bellSchedule';
import Map from './components/map';
import Search from './components/search';

class App extends Component {
  state = {
    value: 0
  };

  handleChange = (event: any, value: any) => {
    this.setState({ value });
  };

  render() {
    const classes = { root: 'App' };
    const value = this.state.value;

    let CurrentComponent = React.createClass({
      render: function() {
        // make sure this var starts with a capital letter
        if (value == 0) {
          return <BellSchedule />;
        } else if (value == 1) {
          return <Map />;
        } else {
          return <Search />;
        }
      }
    });

    let thingToReturn = (
      <MuiThemeProvider>
        <div className={classes.root}>
          {/*Put stuff here*/}
          <CurrentComponent />
          <BottomNavigation
            value={value}
            onChange={this.handleChange}
            showLabels="True"
          >
            <BottomNavigationButton
              label="Bell Schedule"
              icon={<RestoreIcon />}
            />
            <BottomNavigationButton label="Map" icon={<FavoriteIcon />} />
            <BottomNavigationButton label="Search" icon={<LocationOnIcon />} />
          </BottomNavigation>
        </div>
      </MuiThemeProvider>
    );

    return thingToReturn;
  }
}

export default App;
