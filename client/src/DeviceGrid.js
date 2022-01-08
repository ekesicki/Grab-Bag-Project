import React from "react";
import { Draggable } from 'react-beautiful-dnd';
import { Container, Row, Col, Card} from 'react-bootstrap';

import Device from './Device';


function DeviceGrid (props) {

    // Props recieved could be the entire list to create rows for
    // Could also be just a set amount of objects to add to the row
    // I think that the first is better, since that way all the row logic
    // is happening here, the other objects/fcns don't need to worry abt it

    // Could slice up the array into slices of 4, and make a new array of the slices
    // Then do a double map fcn. Map into each slice, create a row, then map to create
    // the devices in that row. 
    var deviceProps = props;

    // This method converts props (an object containing objects)
    //   into an array of objects
        var devices = Object.keys(props).map(key => {
        return props[key];
    })

    var slicedDevices = [];
    var currentSlice = [];
    const numColumns = 3;

    /* console.log("Unsliced GB Devices: ");
    console.log(devices); */

    if (devices?.length) {
        for (var i = 0; i < devices.length; i += numColumns) {
            
            currentSlice = devices.slice(i, i + numColumns);
            slicedDevices.push(currentSlice);
        }
    }
    i = 0;

    return (
        <Container className = "deviceRows">
            {slicedDevices?.length ? 
            (slicedDevices.map(slice => {
                {console.log("Current Slice:")}
                {console.log(slice)}
                return (
                    <Row key = {i++}>
                        {slice.map((deviceEntry) => {
                            {console.log("Current Device to Load:")}
                            {console.log(deviceEntry)}
                            return (
                                <Col key = {deviceEntry?.wikiid}>
                                    <Device {...deviceEntry} key = {deviceEntry?.wikiid}></Device>
                                </Col>
                            )
                        })}
                    </Row>
                )
            }))
            : "Currently Empty - Drag some items in!"}
        </Container>
    );
}






export default DeviceGrid;