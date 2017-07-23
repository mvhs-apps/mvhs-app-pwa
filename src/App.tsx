import * as React from 'react';
import './App.css';
import SimpleBottomNavigation from './components/bottomNav';

import 'typeface-roboto';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => {
  return (
    <MuiThemeProvider>
      {/*Put stuff here*/}
      <SimpleBottomNavigation />
    </MuiThemeProvider>
  );
};

export default App;
