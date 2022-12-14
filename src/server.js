const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');
require('dotenv').config();

PORT = process.env.PORT;
console.log(PORT);

io.on('connection', (client)=>{
    let roundWinner;
    console.log(`client ${client.id} connected`);
    client.on('create-new-game', (data)=>{
        let roomId = client.id;
        io.to(client.id).emit('room-id', roomId);
        //room id saved to database
        //client id saved to database
        //nickname is saved to database
        //courrent round set to 1
    })
    client.on('join-room', (data)=>{
        client.join(data.roomId);
        io.to(client.id).emit('you-joined', data.roomId);
        //Send signal to game creator that player joined room
        //save client.id to database
        //save data.nickname to database
    })
    //Send signal to start game.
    client.on('send-sonata', (sonata)=>{
        roundWinner = false;
        //saves sonata to database
        console.log('The sonata is: ', sonata)
        client.broadcast.emit('receive-sonata', sonata)
    })
    client.on('guess-sonata', (sonataGuess)=>{
        //compare sonata with the one in database
        //if sonataGuess === sonata && roundWinner === false
            roundWinner = true;
            io.to(client.id).emit('you-win-round')
            client.broadcast.emit('player-won-round', client.id);
            //make changes in database
            //if(rounds_left === 0)
                io.emit('game-end', {
                    winner: 'Player 1',
                })
                //end room
            //else
                //send the current state of the game to all the players
                io.emit('game-stats', {
                    points: {
                        player1: 2,
                        player2: 3,
                        player3: 0
                    },
                    rounds_left: 2
                })

    })
    client.on('producer-wins-round', ()=>{
        io.to(client.id).emit('you-win-round'),
        client.broadcast.emit('player-won-round', client.id);
        //make changes in database
        //if(rounds_left === 0)
            io.emit('game-end', {
                winner: 'Player 1',
            })
            //end room
        //else
            //send the current state of the game to all the players
            io.emit('game-stats', {
                points: {
                    player1: 2,
                    player2: 3,
                    player3: 0
                },
                rounds_left: 2
            })
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
