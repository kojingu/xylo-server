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
    client.on('create-new-game', (data)=>{
        let roomId = client.id;
        io.to(client.id).emit('room-id', roomId);
        //room id saved to database
        //client id saved to database
        //nickname is saved to database
    })
    client.on('join-room', (data)=>{
        client.join(data.roomId);
        io.to(client.id).emit('you-joined', data.roomId);
        console.log("Players client.id", client.id);
        //save client.id to database
        //save data.nickname to database
    })
    client.on('disconnect', ()=>{
        console.log(`client ${client.id} disconnected`);
    })
})

app.get('/producer', (req, res)=>{
    res.sendFile(path.join(__dirname, 'producer.html'))
});
app.get('/player', (req, res)=>{
    res.sendFile(path.join(__dirname, 'player.html'))
});
server.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`);
});
