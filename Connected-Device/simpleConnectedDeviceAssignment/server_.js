const http = require('http')
const fs = require('fs');
const express = require('express'); // web server application
const app = express();        // instantiate express server
const server = http.Server(app);  // connects http library to server
const hostname = "127.0.0.1";


const PORT=8083;

app.use(express.static('public'));  // find pages in public directory

server.listen(PORT, () => {
  console.log(`Server running on port:${PORT}/`);
})

//FUNCTION TO SEND EMAIL - I'm assuming it needs to be written on this file
//Access to necessary info from JSON file? And board (for humidity readings)
//Leaves a record on JSON file every time it sends an email?
