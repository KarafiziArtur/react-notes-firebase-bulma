import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bulma/css/bulma.css';
import './index.css';

import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBlOvbI3qPl3wZ-KkHM2ScZT7xVDWTc9wM",
  authDomain: "notes-859fa.firebaseapp.com",
  databaseURL: "https://notes-859fa.firebaseio.com",
  storageBucket: "notes-859fa.appspot.com",
  messagingSenderId: "280734684180"
};
firebase.initializeApp(config);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
