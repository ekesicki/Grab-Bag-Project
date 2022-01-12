import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Device from './Device';
import GrabBag from './GrabBag';
import DeviceGrid from './DeviceGrid';





function App () {


  const [deviceOffset, setDeviceOffset] = React.useState(JSON.parse(window.localStorage.getItem('currentOffset')) || 0);

  const [deviceList, setDeviceList] = React.useState(JSON.parse(window.localStorage.getItem('storedDevices')) || []);

  const [keepLoading, setKeepLoading] = React.useState(true);

  const [grabBagList, setGrabBagList] = React.useState(JSON.parse(window.localStorage.getItem('storedGrabBag')) || []);

  const [windowFull, setWindowFull] = React.useState(false);

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
        "https://www.ifixit.com/api/2.0/wikis/CATEGORY?offset=" + deviceOffset + "&limit=" + numDevices;
 
    fetch(requestAddress)
    .then(r => r.json())
    .then(response => {
      setDeviceOffset((deviceOffset) => deviceOffset + numDevices);
      
        // filter out undefined elements
        response.filter(e => e !== undefined);

        // Add all devices to the deviceList in one call
        setDeviceList((deviceList) => [...deviceList, ...response]);
        //if ()
        setKeepLoading((keepLoading) => false);
    });
  }

  function handleOnDragEnd (result) {
    // If we drag something to a non-droppable area or want to move it out of the grab bag, just return
    if (!result.destination || result.destination.droppableId === "devicesDroppable") return;

    // If we drop into the grab bag, add the device to the bag list and remove it from the device list
    if (result.destination.droppableId = "grabBag") {
      const currentDevices = Array.from(deviceList);
      const movedDevice = currentDevices.find(e => e?.wikiid === parseInt(result.draggableId));

      setGrabBagList((grabBagList) => [...grabBagList, movedDevice]);

      // filter out the movedDevice from the deviceList.
      setDeviceList((deviceList) => deviceList.filter(e => e?.wikiid !== movedDevice.wikiid))
    }
  }

  function clearStorage () {
    localStorage.clear();
    console.log("Local Storage Cleared");
  }
  /* Multiple useEffects
  const onLoad = React.useEffect(() => {
    // fetch and load devices until page is full
    fetchAndSetDevices(20);
    window.addEventListener("scroll", handleScroll);

  }, []);

  const onScroll = React.useEffect(() => {
    // fetch more devices when user scrolls 
    fetchAndSetDevices(4)
    window.localStorage.setItem('storedDevices', JSON.stringify(deviceList));
    window.localStorage.setItem('currentOffset', JSON.stringify(deviceOffset));

  }, [keepLoading]);

  const onGrabBagUpdate = React.useEffect(() => {
    // Adding arrays and offset to local storage

    window.localStorage.setItem('storedGrabBag', JSON.stringify(grabBagList));
    window.localStorage.setItem('currentOffset', JSON.stringify(deviceOffset));
  }, [deviceList, grabBagList]);
*/

  // Load, Save, and Scroll
  const loadSaveAndScroll = React.useEffect(() => {
    // Will fetch devices and load stored states
    // when we scroll to the bottom or add something to the bag
    
    // if there's nothing loaded, load enough devices to fill the page
    // otherwise, just load a few more.
    if (deviceOffset === 0) {
      fetchAndSetDevices(20);
    }
    else {
      fetchAndSetDevices(4);
    }


    window.addEventListener("scroll", handleScroll); // attaching scroll event listener

    // Adding arrays and offset to local storage
    window.localStorage.setItem('storedDevices', JSON.stringify(deviceList));
    window.localStorage.setItem('storedGrabBag', JSON.stringify(grabBagList));
    window.localStorage.setItem('currentOffset', JSON.stringify(deviceOffset));

  }, [keepLoading, grabBagList]); 
  



  return (
    <>
      <Button onClick = {clearStorage}>Clear Local Storage</Button>

      <DragDropContext onDragEnd = {handleOnDragEnd}>
        <div className="d-flex justify-content-between">
          <GrabBag {...[grabBagList]}></GrabBag>
          <Droppable droppableId="devicesDroppable">
            {(provided) => (
              <span {...provided.droppableProps} ref = {provided?.innerRef}>
                <h3>Devices</h3>
                  <DeviceGrid {...deviceList}></DeviceGrid>
                {provided.placeholder}
              </span>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  );

/*
  Old Method of displaying deviceList Devices
              <ul>
                <h3>Here's the List of Devices</h3>
                  {deviceList.length ? 
                    (deviceList.map((deviceEntry, index) => {
                      console.log("Device Mapping:");
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
