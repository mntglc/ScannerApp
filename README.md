## SCANNER APP
  This mobile `Android` application is able to do the following:
  *  A barcode for an order and for a position is scanned by a device camera.
  *  An order is exactly 8 digits long and may consist of numeric and alphanumeric values.
  *  A position is exactly 5 characters long and may only consist of numeric values.
  *  If the scan is correct, the scanned code should be displayed in the corresponding field.
  *  There should be a color distinction or indication between a correct scan and a faulty scan (e.g. position too long).
  *  In case of a faulty scan there should be an acoustic warning signal.
  *  If the scan is faulty, there should be a haptic warning signal (vibration).

  This project has been created with mobile application development framework `Apache Cordova`. Uses a plugin to read barcodes with device camera, manage device vibration and an AudioContext object for managing and playing sound.

## USEFUL COMMAND PROMT LIST
  * `npm install -g cordova` - Cordova command-line runs on Node.js and is available on NPM
  * `cordova create <path>` - Create a blank Cordova project
  * `cordova platform add <platform name>` - Add a platform for which you want to build your app
  * `cordova plugin add <plugin name>` - Add a plugin to your app
  * `cordova run <platform name>` - Run your app
  * `cordova build <platform name>` - Build your app
  * `cordova run <platform name> --device` - Run your app on your device  

 ## INSTALLED PLUGINS
  * `phonegap-plugin-barcodescanner` - The Barcode Scanner Plugin opens a camera view and automatically scans a barcode, returning the data back to you.
  * `cordova-plugin-dialogs` - This plugin provides access to some native dialog UI elements via a global navigator.notification object.
  * `cordova-plugin-vibration` - This plugin provides a way to vibrate the device. 
