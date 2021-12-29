import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Device from './Device';
import reportWebVitals from './reportWebVitals';




function App () {


  const [deviceOffset, setDeviceOffset] = React.useState(0);

  const [deviceList, setDeviceList] = React.useState([]);

  const [keepLoading, setKeepLoading] = React.useState(true);

  // handleScroll triggers when we scroll down the page
  //   It calculates if we have scrolled past the bottom of the page
  //   Then it sets keepLoading to True.
  //   This will cause our useEffect to trigger and fetchAndSetOneDevice

  const handleScroll = () => {
    let userScrollHeight = window.innerHeight + window.scrollY;
    let windowBottomHeight = document.documentElement.offsetHeight;
    if (userScrollHeight >= windowBottomHeight) {
      setKeepLoading(true);
    }
  };


  // moving back to fetch.then.then notation, starting with just one device
  const fetchAndSetOneDevice = async() => {
    const requestAddress = 
        "https://www.ifixit.com/api/2.0/wikis/CATEGORY?offset=" + deviceOffset + "&limit=1";

    
    fetch(requestAddress)
    .then(r => r.json())
    .then(response => {
      setDeviceOffset((deviceOffset) => deviceOffset + 1);
      setDeviceList((deviceList) => [...deviceList, response[0]]);
      setKeepLoading((keepLoading) => false);
    });

  }

  React.useEffect(() => {
    // Will fetch one device and set state with that device
    // Trying to make a custom device object
    
    window.addEventListener("scroll", handleScroll); // attaching scroll event listener


  }, [keepLoading]); 

  return (
    <div>
      {deviceList.length ? 
        (deviceList.map(deviceEntry => {
          console.log("In Mapping Function");
          console.log(deviceList);
          return <Device {...deviceEntry} key = {deviceEntry?.wikiid}></Device>
        }))
        : "No Items Loaded Yet"}
    </div>
  );

/*
  
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
