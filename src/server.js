const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');
require('dotenv').config();

PORT = process.env.PORT;
console.log(PORT);

io.on('connection', (client)=>{
    console.log(`client ${client.id} connected`);

    client.on('disconnect', ()=>{
        console.log(`client ${client.id} disconnected`);
    })
})

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'index.html'))
});

server.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`);
});
