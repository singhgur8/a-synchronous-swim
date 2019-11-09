const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
  //console.log(messageQueue); //{enqueue: [Function], dequeue: [Function]}
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.writeHead(200, headers);

  //res.write() //Anything with %%% means I added it, pass in the info from key press handler
  //res.write(messageQueue.dequeue().toString());
  // console.log(messageQueu);
  var data;
  //if the req.method is POST then enque to the storage
  if (req.method === 'POST') {
    //messageQueue.enqueue(req._postData);
  }
  if (req.method === 'GET') {

    //if(req.contentType)
    console.log('req: ' + req.url);

    if( req.url !==undefined ) { //probably an img url for now
      //get the img from storage ?? what is the storage
      //if the storage cant find the url
        //write head 404
        res.writeHead(404, headers);
        let pathName = path.join('.', res.url);
        console.log('path: ' + pathName);
        //data = IMG url?
        if( fs.exists(pathName) ){
          res.writeHead(200, headers);
          console.log();
        }
      //reds.end the URL? of the img
    } else { //probably a swim request for now
      data = messageQueue.dequeue() || '';
      data = data.toString();
    }

  }

  res.end(data);

  next(); // invoke next() at the end of a request to help with testing!
};
