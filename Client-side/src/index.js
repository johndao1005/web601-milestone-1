import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import './framework/bootstrap/css/bootstrap.min.css'
import "./framework/bootstrap-icons/bootstrap-icons.css" 
import "./framework/boxicons/css/boxicons.min.css" 
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
