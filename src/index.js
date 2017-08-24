// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

import './utils/addtohomescreen.js';
import './utils/addtohomescreen.css';

ReactDOM.render(<App />, document.getElementById('root'));

OfflinePluginRuntime.install({
  onUpdateReady: () => {
    console.log('SW Event:', 'onUpdateReady');
    OfflinePluginRuntime.applyUpdate();
  },
  onUpdated: () => {
    console.log('SW Event:', 'onUpdated');
    // TODO: Use snackbar for proper updating
    window.location.reload();
  }
});

window.addToHomescreen();
