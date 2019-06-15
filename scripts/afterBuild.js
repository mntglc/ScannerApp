const fs = require('fs');
const path = require('path');
const util = require('util');
const stat = util.promisify(fs.stat);

module.exports = function (ctx) {
    // Make sure android platform is part of build
    if (!ctx.opts.platforms.includes('android')) return;

    // TODO: check if is debug build
    const platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app');
    const apkFileLocation = path.join(platformRoot, 'build/outputs/apk/debug/app-debug.apk');

    return stat(apkFileLocation).then(stats => {
        // Do something with `stats`
        console.log(`Size of ${apkFileLocation} is ${stats.size} bytes`);
    }).catch((error) => {
        // Handle the error.
        console.log(`Get apk file size error: ${error}`);
    });
};
