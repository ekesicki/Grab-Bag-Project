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
                        alt = "Error Loading Bag Art"
                        style = {{width: 200, height: 200}}>
                    </img>
                    <h3>Grab Bag</h3>
                    
                    <DeviceGrid {...grabBagList}></DeviceGrid>
                {provided.placeholder}
                </span>
            )}
        </Droppable>
    );
}


export default GrabBag;