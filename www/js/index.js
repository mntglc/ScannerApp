/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var ScanState = {
    OK: 1,
    KO: 2,
    SCANNING: 3,
    CANCELLED: 4,
}


var app = {

    // Application Constructor
    initialize: function () {
        document.getElementById("buttonScanBarCode").addEventListener("click", this.scanBarCode.bind(this), false);
        document.getElementById("buttonVibrate").addEventListener("click", this.vibrate.bind(this), false);
        document.getElementById("buttonBeep").addEventListener("click", this.playBeep.bind(this), false);
    },




    scanBarCode: function () {
        this.setState(ScanState.SCANNING);
        var self = this;
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                setTimeout(() => {
                    self.scanComplete(result);
                }, 200);
            },
            function (error) {
                alert("Scanning failed: " + error);
            },
            {
                // formats	    Android	iOS		Windows
                // QR_CODE		✔		✔		✔
                // DATA_MATRIX	✔		✔		✔
                // UPC_A		✔		✔		✔
                // UPC_E		✔		✔		✔
                // EAN_8		✔		✔		✔
                // EAN_13		✔		✔		✔
                // CODE_39		✔		✔		✔
                // CODE_93		✔		✖		✔
                // CODE_128	    ✔		✔		✔
                // CODABAR		✔		✖		✔
                // ITF			✔		✔		✔
                // RSS14		✔		✖		✔
                // PDF_417		✔		✔		✔
                // RSS_EXPANDED ✔		✖		✖
                // MSI			✖		✖		✔
                // AZTEC		✖		✖		✔

                preferFrontCamera: false, // iOS and Android
                showFlipCameraButton: false, // iOS and Android
                showTorchButton: false, // iOS and Android
                torchOn: false, // Android, launch with the torch switched on (if available)
                saveHistory: false, // Android, save scan history (default false)
                prompt: "Place a barcode inside the scan area", // Android
                resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                //formats : "CODE_128", // default: all but PDF_417 and RSS_EXPANDED
                orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
                disableAnimations: true, // iOS
                disableSuccessBeep: true // iOS and Android
            }
        );
    },

    scanComplete: function (result) {
        //  result properties:
        //     text: string
        //     format: string
        //     cancelled: bool
        if (result.cancelled) {
            this.setState(ScanState.CANCELLED);
            return;
        }
        else {
            var barcode = result.text;
            if (barcode.length == 8) {
                var alphaNumericRegEx = /[^a-z\d]/i;
                var isAlphaNumeric = !(alphaNumericRegEx.test(barcode));
                if (isAlphaNumeric) {
                    // the barcode is an order
                    document.getElementById('inputOrder').value = "" + barcode;
                    this.setState(ScanState.OK);
                    return;
                }
            }
            else if (barcode.length == 5) {
                var numericRegEx = /[^\d]/i;
                var isNumeric = !(numericRegEx.test(barcode));
                if (isNumeric) {
                    // the barcode is a position
                    document.getElementById('inputPosition').value = "" + barcode;
                    this.setState(ScanState.OK);
                    return;
                }
            }
        }
        // the barcode is not an order or a position
        this.setState(ScanState.KO);
    },


    playBeep: function () {
        // plugin inplementation (play default sound configured on device)
        // navigator.notification.beep(1);

        // tone synthesizer
        var duration = 1000;    // [1, 5000] ms
        var frequency = 300;    // [40, 6000] Hz
        var volume = 60;        // [1, 100]
        var type = "square";           // [0:sine, 1:square, 2:sawtooth, 3:triangle]
        var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        var oscillator = audioCtx.createOscillator();
        var gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        gainNode.gain.value = volume;
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        oscillator.start();
        setTimeout(function () {
            oscillator.stop();
        }, duration);
    },


    vibrate: function () {
        navigator.vibrate([1000]);
    },


    setState: function (state) {
        var self = this;
        var body = document.getElementsByTagName("BODY")[0];
        switch (state) {
            case ScanState.KO:
                self.playBeep();
                self.vibrate();
                body.className = "backgroundcolorKO";
                break;

            case ScanState.OK:
                body.className = "backgroundcolorOK";
                break;

            case ScanState.SCANNING:
                document.getElementById('inputOrder').value = '';
                document.getElementById('inputPosition').value = '';
                body.className = "backgroundcolor";
                break;

            case ScanState.CANCELLED:
                body.className = "backgroundcolor";
                break;

            default:
                body.className = "backgroundcolor";
                break;
        }
    }

};

app.initialize();