import * as React from 'react';
import './App.css';

import 'typeface-roboto';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BottomNavigation, {
  BottomNavigationButton
} from 'material-ui/BottomNavigation';

import RestoreIcon from 'material-ui-icons/Restore';
import FavoriteIcon from 'material-ui-icons/Favorite';
import LocationOnIcon from 'material-ui-icons/LocationOn';

const App = () => {
  return (
    <MuiThemeProvider>
      <div className="App">
        <BottomNavigation index={0} showLabels="true">
          <BottomNavigationButton label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationButton label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationButton label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </div>
    </MuiThemeProvider>
  );
};

export default App;
