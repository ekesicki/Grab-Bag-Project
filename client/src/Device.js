import React from "react";

// We want each grab bag item to be its own element.
// Created an element successfully. Now try to create them in a loop
// Example: Have a list of greetings, go through the list and 
//   generate each greeting. 


function Device ({greeting}) {
    return <div className = "device">{greeting}, here is a device. </div>;
}


export default Device;