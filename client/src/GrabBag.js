import React, { useEffect } from "react";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Device from './Device';

// This will be the Grab Bag to store devices
// Eventually needs a way to store the devices it has


function GrabBag (props) {

    return (
        <Droppable droppableId="grabBag">
            {(provided) => (
                <span className = "grabBag" {...provided.droppableProps} ref = {provided?.innerRef}>
                    <img src = {"https://www.pngmart.com/files/7/School-Bag-PNG-Image.png"} 
                        alt = "Error Loading Bag"
                        style = {{width: 200, height: 200}}>
                    </img>
                    <li>Grab Bag</li>   
                </span>
            )}
        </Droppable>
    );
}

/* // Logic for loading a list of items from the main app

{props.grabBagList.length ? 
    (props.grabBagList.map(deviceEntry => {
        // console.log("In Grab Bag Mapping Function");
        // console.log(grabBagList);
        return <Device {...deviceEntry} key = {deviceEntry?.wikiid}></Device>
    }))
    : "No Items In Bag Yet"}
*/

export default GrabBag;