# Grab-Bag-Project
Grab Bag Project for Dozuki
Creating a website to allow users to categorize their items

Usage:
1. Clone this repository
2. Enter ./client/src
3. to start the website on your local server use $npm start
4. Shrink the window size and scroll down to start infinite scrolling functionality.
 
Devices are displayed as a list of images with labels. You can drag devices onto the grab bag 
  to store them there. Scroll to the bottom to update the stored values. Items stored in the grab bag
  will be remembered on refresh. You can check what items are in the grab bag in Local Storage 
  under the Application tab in the Inspect window. 

Known Issues:
1. More devices cannot be loaded until you minimize the window to the point where you can scroll
2. Devices are only saved to local storage after scrolling down and loading more devices.
3. Devices are loading only in a single column
4. Grab Bag is above the device list, making it hard to add devices further down
5. Looks very basic