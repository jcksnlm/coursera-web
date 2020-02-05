"use strict";
exports.__esModule = true;
var curl = require("curl");
var jsdom = require("jsdom");
var url = "http://explosm.net/rcg/view/";
var fs = require("fs");
var request = require("request");
var gottenFiles = [];
var init = function () {
    fs.readdir('./images/', function (err, files) {
        gottenFiles = [];
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach(function (file) {
            gottenFiles.push(file);
        });
        curl.get(url, null, function (err, resp, body) {
            if (resp.statusCode == 200) {
                handleData(body);
            }
            else {
                console.log("error while fetching url");
            }
        });
    });
};
function handleData(html) {
    var JSDOM = jsdom.JSDOM;
    var dom = new JSDOM(html);
    var $ = (require('jquery'))(dom.window);
    //let's start extracting the data
    var items = $('img[src^="https://rcg-cdn.explosm.net/panels/"]');
    for (var i = 0, item = void 0; i < items.length; i++) {
        item = items[i];
        var imageUrl = item.src;
        var imageName = getImageName(imageUrl);
        if (gottenFiles.indexOf(imageName) === -1) {
            download(imageUrl, "./images/" + imageName, function () { console.log('item novo encontrado'); });
        }
    }
}
var download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};
var getImageName = function (url) {
    return url.match('[A-Z0-9]+\.png')[0];
};
setInterval(function () {
    init();
}, 5000);
/*
https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});*/
