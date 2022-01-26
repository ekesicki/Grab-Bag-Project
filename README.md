# Grab-Bag-Project
Grab Bag Project for Dozuki
Creating a website to allow users to manipulate items from ifixit
 - Uses react-beautiful-dnd which can be found at https://github.com/atlassian/react-beautiful-dnd
 - Uses react-bootstrap which can be found at https://github.com/react-bootstrap/react-bootstrap

Usage:
1. Clone this repository
2. Enter ./client/src
3. To start the website on your local server use $npm start
 
Devices are displayed as a list of images with labels. You can drag devices onto the grab bag 
side to store them there. Items stored in the grab bag will be remembered on refresh.

You can also check what items are in the grab bag and what devices have been loaded in Local Storage under the Application tab in the Inspect window. 

You can click the Clear Local Storage button to clear local storage. Reloading the page will
then reset you to no objects in the bag.

Known Issues:
1. Cards can look misaligned in some instances, depending on screen size and how many items
    have been loaded