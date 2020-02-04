import curl = require("curl");
import jsdom = require("jsdom");
const url = "http://explosm.net/rcg/view/";
import fs = require('fs');
import request = require('request');
var gottenFiles:Array<string> = [];


let init = () => {
    fs.readdir('./images/', (err, files) => {
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
          download(imageUrl, `./images/${imageName}`, ()=>{/*console.log('Baixou')*/});
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
setInterval(()=>{
    init();
}, 10000);



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
