import curl = require("curl");
import jsdom = require("jsdom");
const url = "http://explosm.net/rcg/view/";
import fs = require('fs');
import request = require('request');
import { Express } from 'express';
import express = require('express');
import * as bodyParser from 'body-parser';

var gottenFiles:Array<string> = [];
const PORT = 2000;

const app:Express = express();

const getImages = () => {
    fs.readdir('./images/', (err, files) => {
        gottenFiles = [];
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach((file) => {
            gottenFiles.push(file);
        });

        curl.get(url, null, (err,resp,body)=>{
            if(resp.statusCode == 200){
                handleData(body);
            }
            else  {
                console.log("error while fetching url");
            }
        });

    });


}

function handleData(html){

    const {JSDOM} = jsdom;
    const dom = new JSDOM(html);
    const $ = (require('jquery'))(dom.window);
    //let's start extracting the data
    var items = $('img[src^="https://rcg-cdn.explosm.net/panels/"]');

    for(let i = 0, item; i < items.length; i++) {
      item = items[i];
      let imageUrl = item.src;
      let imageName = getImageName(imageUrl);

      if (gottenFiles.indexOf(imageName) === -1) {
          download(imageUrl, `./images/${imageName}`, ()=>{console.log('item novo encontrado')});
      }
    }
}

const download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

const getImageName = (url) => {
    return url.match('[A-Z0-9]+\.png')[0];
}




// Add headers
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type");
   next();
});

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '51mb'}));

/*--------- ENDPOINTS  ----------*/

app.get('/getnextimage', (req, res) => {
    fs.readdir('./images/', (err, files) => {
        let imageName:string = '';
        if (err) {
            res.send('fail!');
            return console.log('Unable to scan directory: ' + err);
        }

        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            if(!file.match('^(y|n)\-')) {
                imageName = file;
                break;
            }
        }

        res.send(imageName);

    });

});


// setInterval(()=>{
//     getImages();
// }, 5000);


const server = app.listen(PORT, () => console.log(`Listening on ${ PORT }`));


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
