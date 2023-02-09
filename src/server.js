const express = require('express');
const app = express();
const server = require('http').createServer(app);
const connectIO = require("./events/index");
const path = require('path');
require('dotenv').config();

PORT = process.env.PORT;

connectIO(server);

app.get('/producer', (req, res)=>{
    res.sendFile(path.join(__dirname, 'producer.html'))
});
app.get('/player', (req, res)=>{
    res.sendFile(path.join(__dirname, 'player.html'))
});
server.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`);
});
