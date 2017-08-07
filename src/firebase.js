// @flow

import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCfRrWtuQjgV2ekSGkmDn_BROYje60T61c',
  authDomain: 'mvhs-app-d04d2.firebaseapp.com',
  databaseURL: 'https://mvhs-app-d04d2.firebaseio.com',
  projectId: 'mvhs-app',
  storageBucket: 'mvhs-app.appspot.com',
  messagingSenderId: '408854922610'
};
firebase.initializeApp(config);

export default firebase;
