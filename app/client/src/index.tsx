import React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import "react-datepicker/dist/react-datepicker.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
