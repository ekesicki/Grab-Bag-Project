import React, { useEffect } from "react";

// We want each grab bag item to be its own element.
// Want to be able to have each device make its own
// fetch - this way we can move the logic here and 
// have the App just load more devices when it needs to


function Device () {
    // initializing the state as empty 
    const [device, setDevice] = React.useState('');

    // useEffect will run when the component first mounts,
    // then we can set the state with that data.
    // This is where we want to fetch a device.
    useEffect(() => {

        async function getDevice () {
            try {
                // we will wait for the fetch request, then set its response as our data
                // TODO: This request will get the same thing each time - the first entry 
                //       Need to figure out a way to grab them sequentially
                const res = await fetch("https://www.ifixit.com/api/2.0/wikis/CATEGORY?offset=17&limit=1");
                const data = await res.json();

                /* console.log("getDevice returned the following data:");
                console.log(typeof(data));
                console.log(data); */

                // set this component's state using the data we just got
                // the device ojbect itself is at data[0]
                setDevice(data[0]);

            } catch (err) {
                console.log(err);
            }
        }

        // Above code is writing the function, now we call it
        getDevice();
        console.log(device.image.standard); //<img src = {device.image.standard}></img>


    }, []); // not dependent on anything, we don't want this component to change 

    return (
        <div className = "device" key = {device.wikiid} >
            <label>Display Title: {device.display_title}</label>
        </div>
    );
}


export default Device;