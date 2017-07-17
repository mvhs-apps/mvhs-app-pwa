import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './index.css';

import App from './App';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';

import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootEpic from './epics/index';
import rootReducer from './reducers/index';

import 'default-passive-events/default-passive-events';
import 'preact/devtools';

const epicMiddleware = createEpicMiddleware(rootEpic, {
  dependencies: {}
});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(epicMiddleware))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

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
