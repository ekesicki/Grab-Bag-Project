import React, { useEffect } from "react";

// We want each grab bag item to be its own element.
// Want to be able to have each device make its own
// fetch - this way we can move the logic here and 
// have the App just load more devices when it needs to


function Device () {
    // initializing the state as empty 
    const [device, setDevice] = React.useState([]);

    async function getAndSetDevice () {
        try {
            // we will wait for the fetch request, then set its response as our data
            // TODO: This request will get the same thing each time - the first entry 
            //       Need to figure out a way to grab them sequentially
            const res = await fetch("https://www.ifixit.com/api/2.0/wikis/CATEGORY?offset=17&limit=1");
            const data = await res.json();

            setDevice(data[0]);

        } catch (err) {
            console.log(err);
        }
    }

    // useEffect will run when the component first mounts,
    // then we can set the state with that data.

    useEffect(() => {
        getAndSetDevice();
    },[]); // not dependent on anything - give an empty array so it only executes this once

    // With the images, since they are nested info it looks like they are not loading in time
    // Need to have a temporary value in the img while the object loads?
    // Did this with the question mark in device.image?.standard.
    // I think the ? mark means that it will only load the .standard if there's something to load

    //            <img src = {device.image.standard} alt = "No Image Available"></img>

    return (
        <div className = "device" key = {device.wikiid}>
            <img src = {device.image?.standard} alt></img>
            <li>{device.display_title}</li>
        </div>
    );
}


export default Device;