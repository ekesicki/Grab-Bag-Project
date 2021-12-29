import React, { useEffect } from "react";

// This will be the Grab Bag to store devices
// Eventually needs a way to store the devices it has


function GrabBag (props) {

    return (
        <div className = "GrabBag">
            <img src = {"https://www.pngmart.com/files/7/School-Bag-PNG-Image.png"} 
                alt = "Error Loading Bag"
                style = {{width: 200, height: 200}}>
            </img>
            <li>Grab Bag</li>
        </div>
    );
}


export default GrabBag;