import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Device from './Device';
import GrabBag from './GrabBag';




function App () {


  const [deviceOffset, setDeviceOffset] = React.useState(JSON.parse(window.localStorage.getItem('currentOffset')) || 0);

  const [deviceList, setDeviceList] = React.useState(JSON.parse(window.localStorage.getItem('storedDevices')) || []);

  const [keepLoading, setKeepLoading] = React.useState(false);

  const [grabBagList, setGrabBagList] = React.useState(JSON.parse(window.localStorage.getItem('storedGrabBag')) || []);

  //const [canScroll, setCanScroll] = React.useState(false);

  // handleScroll triggers when we scroll down the page
  //   It calculates if we have scrolled past the bottom of the page
  //   Then it sets keepLoading to True.
  //   This will cause our useEffect to trigger and fetchAndSetOneDevice

  const handleScroll = () => {
    let userScrollHeight = window.innerHeight + window.scrollY;
    let windowBottomHeight = document.documentElement.offsetHeight;

    //console.log("scroll height: " + userScrollHeight);

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

      if (response[0] !== undefined) {
        setDeviceList((deviceList) => [...deviceList, response[0]]);
      }
      setKeepLoading((keepLoading) => false);
    });
  }

  const fetchAndSetDevices = async(numDevices) => {
    const requestAddress = 
        "https://www.ifixit.com/api/2.0/wikis/CATEGORY?offset=" + deviceOffset + "&limit=1";
 
    fetch(requestAddress)
    .then(r => r.json())
    .then(response => {
      setDeviceOffset((deviceOffset) => deviceOffset + 1);

      if (response[0] !== undefined) {
        setDeviceList((deviceList) => [...deviceList, response[0]]);
      }
      setKeepLoading((keepLoading) => false);
    });
  }

  React.useEffect(() => {
    // Will fetch one device and set state with that device
    // Trying to make a custom device object
    
    fetchAndSetOneDevice();

    window.addEventListener("scroll", handleScroll); // attaching scroll event listener

    // Adding arrays and offset to local storage
    window.localStorage.setItem('storedDevices', JSON.stringify(deviceList));
    window.localStorage.setItem('storedGrabBag', JSON.stringify(grabBagList));
    window.localStorage.setItem('currentOffset', JSON.stringify(deviceOffset));

  /*   console.log("Grab Bag List:");
    console.log(grabBagList);
    console.log("Device List:");
    console.log(deviceList); */


  }, [keepLoading, grabBagList]); 



  function handleOnDragEnd (result) {
    // If we drag something to a non-droppable area, just return
    if (!result.destination) return;

    // If we drop into the grab bag, add the device to the bag list 
    // and remove it from the device list
    if (result.destination.droppableId = "grabBag") {
      const currentDevices = Array.from(deviceList);
      //console.log(currentDevices);
      const movedDevice = currentDevices.find(e => e?.wikiid === parseInt(result.draggableId));
      //console.log("Moved Device:");
      //console.log(movedDevice);
      setGrabBagList((grabBagList) => [...grabBagList, movedDevice]);

      // filter out the movedDevice from the deviceList.
      setDeviceList((deviceList) => deviceList.filter(e => e?.wikiid !== movedDevice.wikiid))
    }

  }

  return (
    <>
      <DragDropContext onDragEnd = {handleOnDragEnd}>
        <GrabBag {...[grabBagList]}></GrabBag>
          <Droppable droppableId='devices'>
            {(provided) => (
              <span {...provided.droppableProps} ref = {provided?.innerRef}>
                <ul className = "deviceList">
                <h1>Here's the List of Devices</h1>
                  {deviceList.length ? 
                    (deviceList.map((deviceEntry, index) => {
                      // console.log("In Mapping Function");
                      // console.log(deviceList);
                      return (
                        <Draggable key = {deviceEntry?.wikiid} draggableId = {JSON.stringify(deviceEntry?.wikiid)} index = {index}>
                          {(provided) => (
                            <div {...provided.draggableProps} {...provided.dragHandleProps} ref = {provided.innerRef}>
                              <li>
                                <Device {...deviceEntry} key = {deviceEntry?.wikiid}></Device>
                              </li>
                            </div>
                          )}
                        </Draggable>
                      )
                    }))
                  : "No Items Loaded Yet"}
                </ul>
              </span>
            )}
          </Droppable>
      </DragDropContext>
    </>
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
