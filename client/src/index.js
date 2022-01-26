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
    if (!result.destination || result.destination.droppableId === "devicesDroppable" ) {
      return;
    }

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


  // Load, Save, and Scroll 
  
  const loadSaveAndScroll = React.useEffect(() => {
    // Will fetch devices and load stored states
    // when we scroll to the bottom or add something to the bag
    
    // if there's nothing loaded, load enough devices to fill the page
    // otherwise, just load a few more.
    // Can't use an if statement, otherwise the useEffect will run twice
    // and the fetches will execute in parallel, grabbing the same devices

    // Maybe try to calculate how many images will load 
    // using standard size images, 255 pixels tall. 4 images per row
    // So we want (window height / 255) * 4
    

    fetchAndSetDevices(Math.round((window.innerHeight / 255) * 2));


    window.addEventListener("scroll", handleScroll); // attaching scroll event listener

    // Adding arrays and offset to local storage
    window.localStorage.setItem('storedDevices', JSON.stringify(deviceList));
    window.localStorage.setItem('storedGrabBag', JSON.stringify(grabBagList));
    window.localStorage.setItem('currentOffset', JSON.stringify(deviceOffset));

  }, [keepLoading, grabBagList]); 
  



  return (
    <>
      <Button onClick = {clearStorage}>Clear All Devices</Button>

      <DragDropContext onDragEnd = {handleOnDragEnd}>
        <div className="d-flex justify-content-between">
          <GrabBag {...[grabBagList]}></GrabBag>
          <Droppable droppableId="devicesDroppable">
            {(provided) => (
              <span {...provided.droppableProps} ref = {provided?.innerRef}>
                <img src ={"https://images.globalindustrial.com/images/pd/651319.jpg?t=1642057931000"}
                    alt = "Error Loading Device Art"
                    style = {{width: 200, height: 200}}>
                </img>
                <h3>Devices - drag some over to the Grab Bag side!</h3>
                  <DeviceGrid {...deviceList}></DeviceGrid>
                {provided.placeholder}
              </span>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  );

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
