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
  if (req.method === 'GET' || req.method === 'OPTIONS') {

    if(path.extname(req.url)==='.jpg' || req.headers['content-type']==='image') {
      console.log('req header: ' + req.headers['content-type']);
      console.log('req url: ' + req.url);
      console.log('path extname: ' + path.extname(req.url));

      let bgpath = path.join('.', req.url);
      fs.readFile(bgpath, (err, data) => {
        if(!err) {
          //console.log('data:' + data.toString());
          res.writeHead(200, headers);
          res.write(data, 'binary');
          // res.write(data);
          //console.log(data);
          // res.end(data, 'Base64');
          // data = 'ohno';
          // res.end('ohno');
        } else {
          console.error(err);
        }
      });

      //get the img from storage ?? what is the storage
      //if the storage cant find the url
      // res.writeHead(404, headers); //set default as error 404
      // console.log(localhost:3);
      // if( fs.existsSync(req.url) ){
      //   console.log('file exists!');
      //   res.writeHead(200, headers); //found file, set header as 200
      //   // fs.readFileSync(req.url, callback -- check error first404, else writeHead(200, {contenttype: img, contentlength: fileLength},
      //   //write(data, 'binary')
      //   //end()
      //   //)); read the file
      //   //

      // }

    } else { //probably a swim request for now
      data = messageQueue.dequeue() || '';
      data = data.toString();
      res.end(data);
    }

  }

  next(); // invoke next() at the end of a request to help with testing!
};
