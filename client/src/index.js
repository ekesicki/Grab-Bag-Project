import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Device from './Device';
import reportWebVitals from './reportWebVitals';

function App () {


  return (
    <div>
      <Device></Device>
      <Device></Device>
      <Device></Device>
    </div>
  );

/*
    <div>
      <ul>
        {allDevices.map(currentDevice => (
          <Device device = {currentDevice}>
          </Device>
        ))}
      </ul>
    </div>
*/
}
  
ReactDOM.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
