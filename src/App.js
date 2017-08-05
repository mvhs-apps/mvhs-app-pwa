import * as React from 'react';

import './App.css';

import BottomNavigation, {
  BottomNavigationButton
} from 'material-ui/BottomNavigation';
import NotificationIcon from 'material-ui-icons/Notifications';
import MapIcon from 'material-ui-icons/Map';
import SearchIcon from 'material-ui-icons/Search';
import 'typeface-roboto';

import BellSchedule from './components/bellSchedule';
import Map from './components/map';
import Search from './components/search';

class App extends React.Component {
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
      <div className={classes.root}>
        {this.state.index === 1 && <Map />}

        {this.state.index === 0 && <BellSchedule />}

        {this.state.index === 2 && <Search />}

        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels={true}
        >
          <BottomNavigationButton
            label="Bell Schedule"
            icon={<NotificationIcon />}
          />
          <BottomNavigationButton label="Map" icon={<MapIcon />} />
          <BottomNavigationButton label="Search" icon={<SearchIcon />} />
        </BottomNavigation>
      </div>
    );

    /*return       <div className={classes.root}>
     <BottomNavigation value={value} onChange={this.handleChange} showLabels>
     <BottomNavigationButton label="Recents" icon={<NotificationIcon/>} />
     <BottomNavigationButton label="Favorites" icon={<MapIcon />} />
     <BottomNavigationButton label="Nearby" icon={<SearchIcon/>} />
     </BottomNavigation>
     </div>*/
  }
}

export default App;
