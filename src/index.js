// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import registerServiceWorker from './registerServiceWorker';

import './utils/addtohomescreen.js';
import './utils/addtohomescreen.css';

ReactDOM.render(<App showUpdate={false} />, document.getElementById('root'));

registerServiceWorker();
if (!('serviceWorker' in navigator)) OfflinePluginRuntime.install();

window.addToHomescreen({
  lifespan: 0,
  skipFirstVisit: true,
  maxDisplayCount: 1,
  validLocation: [/^\/$/]
});
