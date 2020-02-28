import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Contexts from './state/contexts';

ReactDOM.render(
  <Contexts>
    <App />
  </Contexts>,
  document.getElementById('root'),
);
