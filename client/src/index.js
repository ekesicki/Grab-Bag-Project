import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Device from './Device';
import reportWebVitals from './reportWebVitals';

const mainElement = (
  <div className="container">
    <Device greeting = "Hello"></Device>
    <Device greeting = "Howdy"></Device>
    <Device greeting = "What's up"></Device>
  </div>
)

ReactDOM.render(
  mainElement,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
