const app = require('express')();
const http = require('http');
const fs = require('fs');


const server = http.createServer((req, res) => {
  console.log(req); 

  if (req.method === "POST") {
    var body = '';
    req.on('data', function (chunk) {
      console.log(chunk); 
    });

    req.on('end', function(){
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(body);
    });
  }

}).listen(3000);