"use strict";
exports.__esModule = true;
var curl = require("curl");
var jsdom = require("jsdom");
var url = "http://explosm.net/rcg/view/";
var fs = require("fs");
var request = require("request");
var express = require("express");
var bodyParser = require("body-parser");
var gottenFiles = [];
var PORT = 2000;
var imagePath = './images';
var app = express();
var getImages = function () {
    fs.readdir(imagePath + "/", function (err, files) {
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
            download(imageUrl, imagePath + "/" + imageName, function () { console.log('item novo encontrado'); });
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
// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type");
    next();
});
// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '51mb' }));
/*--------- ENDPOINTS  ----------*/
app.get('/getAll', function (req, res) {
    fs.readdir(imagePath + "/", function (err, files) {
        res.send(files);
    });
});
app.get('/getYesImages', function (req, res) {
    fs.readdir(imagePath + "/", function (err, files) {
        files = files.filter(function (file) {
            return file.match('^y\-');
        });
        res.send(files);
    });
});
app.get('/getnextimage', function (req, res) {
    fs.readdir(imagePath + "/", function (err, files) {
        var imageName = '';
        if (err) {
            res.send('fail!');
            return console.log('Unable to scan directory: ' + err);
        }
        for (var index = 0; index < files.length; index++) {
            var file = files[index];
            if (!file.match('^(y|n)\-')) {
                imageName = file;
                break;
            }
        }
        res.send(imageName);
    });
});
app.post('/classify', function (req, res) {
    var body = req.body;
    fs.rename(imagePath + "/" + body.imgName, imagePath + "/" + (body.vote ? 'y-' : 'n-') + body.imgName, function () { });
    res.send(body.vote ? 'classificou blz' : 'classificou nope');
});
// setInterval(()=>{
//     getImages();
// }, 5000);
var server = app.listen(PORT, function () { return console.log("Listening on " + PORT); });
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
