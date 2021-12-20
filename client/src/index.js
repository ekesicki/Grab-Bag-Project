import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Device from './Device';
import reportWebVitals from './reportWebVitals';

const allDevices = [
  {wikiid: '0', display_title: "dummy_1"}
]


function App () {

  //const [greetings, setGreetings] = React.useState(allGreetings);

  const [devices, setDevices] = React.useState(allDevices);
  

  fetch("https://www.ifixit.com/api/2.0/wikis/CATEGORY?offset=0&limit=10")
  .then(response => response.json(0))
  .then(data => {
    // here is where we can manipulate the returned data
    data.forEach(deviceEntry => {
      //console.log(deviceEntry.display_title);
      allDevices.push(deviceEntry);
    });

    //console.log("Here is the allDevices array: ");
    allDevices.forEach(deviceEntry => {
      // console.log(deviceEntry);
    });
  });


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
