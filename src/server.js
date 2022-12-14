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

    client.on('nickname', (nickname)=>{
        //nickname is saved in the database.
    });
    client.on('number-of-rounds', (numberOfRounds)=>{
        //number of rounds is saved in the database.
    })
    client.on('create-new-game', ()=>{
        let roomId = client.id;
        io.to(client.id).emit('room-id', client.id);
        //room id saved to database
        //client id saved to database
    })
    client.on('join-room', (roomId)=>{
        client.join(roomId);
        io.to(client.id).emit('you-joined', roomId);
    })
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
