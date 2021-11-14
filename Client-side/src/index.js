import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'
import './index.css'
import './framework/bootstrap/css/bootstrap.min.css'
import "./framework/bootstrap-icons/bootstrap-icons.css" 
import "./framework/boxicons/css/boxicons.min.css" 
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <Provider store={store}>
  <App />
</Provider>,
document.getElementById('root')
);

serviceWorker.unregister()

reportWebVitals();
