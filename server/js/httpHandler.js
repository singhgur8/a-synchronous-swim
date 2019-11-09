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
    messageQueue.enqueue(req._postData);
    console.log('hi');
  }
  if (req.method === 'GET') {

    data = messageQueue.dequeue() || '';
    data = data.toString();
  }

  res.end(data);
  next(); // invoke next() at the end of a request to help with testing!
};
