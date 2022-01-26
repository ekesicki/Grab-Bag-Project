import React, { useEffect } from "react";
import { Card } from "react-bootstrap"

// We want each grab bag item to be its own element.
// Want to be able to have each device make its own
// fetch - this way we can move the logic here and 
// have the App just load more devices when it needs to


function Device (props) {

    // With the images, since they are nested info it looks like they are not loading in time
    // Need to have a temporary value in the img while the object loads?
    // Did this with the question mark in device.image?.standard.
    // I think the ? mark means that it will only load the .standard if there's something to load

    return (
        <Card style={{width: "16rem"}}>
            <Card.Img variant="top" src={props?.image?.standard} />
            <Card.Body>
                <Card.Title>{props?.display_title}</Card.Title>
            </Card.Body>
        </Card>
    );
}

export default Device;