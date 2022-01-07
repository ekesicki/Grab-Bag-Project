import React, { useEffect } from "react";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Device from './Device';

// This will be the Grab Bag to store devices
// Eventually needs a way to store the devices it has


function GrabBag (props) {

    const grabBagList = props[0];

    return (
        <Droppable droppableId="grabBag">
            {(provided) => (
                <span className = "GrabBag" {...provided.droppableProps} ref = {provided?.innerRef}>
                    <img src = {"https://www.pngmart.com/files/7/School-Bag-PNG-Image.png"} 
                        alt = "Error Loading Bag"
                        style = {{width: 200, height: 200}}>
                    </img>
                    {/* {console.log("grabBagList:")}
                    {console.log(grabBagList)}
                    {console.log("grabBagList.length:")}
                    {console.log(grabBagList)} */}
                    <h1>Here's the List of Grab Bag Devices</h1>
                    {grabBagList?.length ? 
                        (grabBagList.map(deviceEntry => {
                            // console.log("In Grab Bag Mapping Function");
                            // console.log(grabBagList);
                            return (
                                <li>
                                    <Device {...deviceEntry} key = {deviceEntry?.wikiid}></Device>
                                </li>)
                        }))
                        : "Bag Empty!"}
                </span>
            )}
        </Droppable>
    );
}

/* // Logic for loading a list of items from the main app

                    {console.log("GrabBag props:")}
                    {console.log(props)}
                    {props.length ? 
                        (props.map(deviceEntry => {
                            // console.log("In Grab Bag Mapping Function");
                            // console.log(grabBagList);
                            return (
                                <li>
                                    <Device {...deviceEntry} key = {deviceEntry?.wikiid}></Device>
                                </li>)
                        }))
                        : "No Items In Bag Yet"}
*/

export default GrabBag;