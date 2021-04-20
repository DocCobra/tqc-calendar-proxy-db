const Database = require("@replit/database"); 
const db = new Database(); 

const express = require('express'); 
const bodyParser = require('body-parser'); 
const fs = require('fs'); 

const app = express(); 
const port = 3000; 

function parseDate(dateString) {
  let isoDate = new Date();
  
  const datePieces = dateString.split(' '); 

  const h = datePieces[1].substr(0, 1) === 'A' ? datePieces[0].substr(0, 2) : datePieces[0].substr(0, 2) + 12; 
  const m = datePieces[0].substr(3, 2); 
  
  const MM = +datePieces[3].substr(0, 2) - 1; 
  const DD = datePieces[3].substr(3, 2); 
  
  isoDate.setHours(h); 
  isoDate.setMinutes(m); 
  isoDate.setSeconds(0); 
  isoDate.setMonth(MM, DD); 

  return isoDate.toISOString(); 
}

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

  db.getAll().then(kvp => {

    let eventArray = []; 

    for (const event in kvp) {
      const e = kvp[event]; 
      eventArray.push({
        'id': e.messageSnowflake, 
        'title': e.activity, 
        'start': parseDate(e.startTime), 
        'description': e.description + " - Joined: " + e.joined.current + "/" + e.joined.max 
      }); 
    }; 

    response.writeHead(200, {'Content-Type': 'application/json'}); 
    response.write(JSON.stringify(eventArray)); 
    response.end(); 
  }); 
})

app.post('/', (request, response) => {
  console.log('POST /'); 

  console.log(request.body); 

  db.empty().then(() => {
    db.set(request.body.key, request.body.value);
  }); 

  response.writeHead(200, {'Content-Type': 'text/html'}); 
  response.end(); 
})


app.listen(port); 
console.log(`Listening at http://localhost:${port}`); 