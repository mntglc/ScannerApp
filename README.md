## ScannerApp
* This mobile application should be able to do the following:
*  •	A barcode for an order and for a position is scanned by a device camera.
*  •	An order is exactly 8 digits long and may consist of numeric and alphanumeric values.
*  •	A position is exactly 5 characters long and may only consist of numeric values.
*  •	If the scan is correct, the scanned code should be displayed in the corresponding field.
*  •	There should be a color distinction or indication between a correct scan and a faulty scan (e.g. position too long).
*  •	In case of a faulty scan there should be an acoustic warning signal.
*  •	If the scan is faulty, there should be a haptic warning signal (vibration).
*  •	The application is optimized for `Android`.

## USEFUL COMMAND LIST
  * `npm install -g cordova` - install cordova
  * `cordova create <APPNAME>` - generate a project
  * `cordova platform ls` - list all available platforms
  * `cordova platform add <PLATFORMNAME>` - add a platform to a project
  * `cordova prepare <PLATFORMNAME>`
  * `cordova compile <PLATFORMNAME>`
  * `cordova build <PLATFORMNAME>` -- prepare + compile [--verbose] [--release]
  * `cordova run <PLATFORMNAME>`
  * `cordova run <PLATFORMNAME> --device` -- run on connected device  

 ## USED PLUGIN LIST (with installation commands)
  * `cordova plugin add phonegap-plugin-barcodescanner` -- The Barcode Scanner Plugin opens a camera view and automatically scans a barcode, returning the data back to you.
  * `cordova plugin add cordova-plugin-dialogs` -- This plugin provides access to some native dialog UI elements via a global navigator.notification object.
  * `cordova plugin add cordova-plugin-vibration` -- This plugin provides a way to vibrate the device. 
