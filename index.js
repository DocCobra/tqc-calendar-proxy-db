const Database = require("@replit/database"); 
const db = new Database(); 

const express = require('express'); 
const bodyParser = require('body-parser'); 
const fs = require('fs'); 

const app = express(); 
const port = 3000; 

app.use(bodyParser.json('application/json')); 
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', '*');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Expose-Headers', '*')
  next();
});

app.get('/', (request, response) => {
  console.log('GET /'); 
   
  db.getAll().then(events => {    
    response.writeHead(200, {'Content-Type': 'application/json'}); 
    response.write(JSON.stringify(events)); 
    response.end(); 
  }); 
})

app.post('/', (request, response) => {
  console.log('POST /'); 

  console.log(request.body); 

  db.set(request.body.key, request.body.value);

  response.writeHead(200, {'Content-Type': 'text/html'}); 
  response.end(); 
})


app.listen(port); 
console.log(`Listening at http://localhost:${port}`); 