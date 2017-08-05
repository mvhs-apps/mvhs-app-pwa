import * as React from 'react';
import { Component, PropTypes } from 'react';
import './App.css';
// import {createStyleSheet, withStyles} from "material-ui/styles";
import BottomNavigation, {
  BottomNavigationButton
} from 'material-ui/BottomNavigation';
import NotificationIcon from 'material-ui-icons/Notifications';
import MapIcon from 'material-ui-icons/Map';
import SearchIcon from 'material-ui-icons/Search';
import 'typeface-roboto';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import BellSchedule from './components/bellSchedule';
import Map from './components/map';
import Search from './components/search';

class App extends Component {
  state = {
    index: 0
  };

  handleChange = (event, value) => {
    console.log('setting state to ' + value);
    this.setState({ value });
  };

  render() {
    const classes = { root: 'App' };
    const value = this.state.index;

    return (
      <MuiThemeProvider>
        <div className={classes.root}>
          {this.state.index === 1 && <Map />}

          {this.state.index === 0 && <BellSchedule />}

          {this.state.index === 2 && <Search />}

          <BottomNavigation
            value={value}
            onChange={this.handleChange}
            showLabels="True"
          >
            <BottomNavigationButton
              label="Bell Schedule"
              icon={<NotificationIcon />}
            />
            <BottomNavigationButton label="Map" icon={<MapIcon />} />
            <BottomNavigationButton label="Search" icon={<SearchIcon />} />
          </BottomNavigation>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default App;
