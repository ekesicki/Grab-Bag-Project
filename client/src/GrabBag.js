import React, { useEffect } from "react";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import DeviceGrid from './DeviceGrid';

// This will be the Grab Bag to store devices

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
                    <h3> Here are the Grab Bag Devices</h3>
                    { console.log("GrabBag Devices:")}
                    
                    <DeviceGrid {...grabBagList}></DeviceGrid>
                {provided.placeholder}
                </span>
            )}
        </Droppable>
    );
}

               /* { <h1>Here's the List of Grab Bag Devices</h1>
                    {grabBagList?.length ? 
                        (grabBagList.map(deviceEntry => {
                            // console.log("In Grab Bag Mapping Function");
                            // console.log(grabBagList);
                            return (
                                <li>
                                    <Device {...deviceEntry} key = {deviceEntry?.wikiid}></Device>
                                </li>)
                        }))
                        : "Bag Empty!"} } */

export default GrabBag;