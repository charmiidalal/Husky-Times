import React from 'react';
import ReactDOM from 'react-dom';
import './scss/main.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
//Implements service worker actions
ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
