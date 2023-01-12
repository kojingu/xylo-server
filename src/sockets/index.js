const socketIO = require("socket.io");
const createNewGame = require("./create_new_game.socket");

function connectIO(server){
    const io = socketIO(server);
    io.on('connection', (client)=>{
    console.log(`client ${client.id} connected`);
    client.on('create-new-game', async (data)=>{
        const roomId = await createNewGame(io, client, data);
        io.to(client.id).emit('room-id', roomId);
    })
    // client.on('join-room', (data)=>{
    //     client.join(data.roomId);
    //     io.to(client.id).emit('you-joined', data.roomId);
    //     //Send signal to game creator that player joined room
    //     //save client.id to database
    //     //save data.nickname to database
    // })
    // //Send signal to start game.
    // client.on('send-sonata', (sonata)=>{
    //     //saves sonata to database
    //     console.log('The sonata is: ', sonata)
    //     client.broadcast.emit('receive-sonata', sonata)
    // })
    // client.on('guess-sonata', (sonataGuess)=>{
    //     //compare sonata with the one in database
    //     //if sonataGuess === sonata && roundWinner === false
    //         io.to(client.id).emit('you-win-round')
    //         client.broadcast.emit('player-won-round', client.id);
    //         //make changes in database
    //         //if(rounds_left === 0)
    //             io.emit('game-end', {
    //                 winner: 'Player 1',
    //             })
    //             //end room
    //         //else
    //             //send the current state of the game to all the players
    //             io.emit('game-stats', {
    //                 points: {
    //                     player1: 2,
    //                     player2: 3,
    //                     player3: 0
    //                 },
    //                 rounds_left: 2
    //             })

    // })
    // client.on('producer-wins-round', ()=>{
    //     io.to(client.id).emit('you-win-round'),
    //     client.broadcast.emit('player-won-round', client.id);
    //     //make changes in database
    //     //if(rounds_left === 0)
    //         io.emit('game-end', {
    //             winner: 'Player 1',
    //         })
    //         //end room
    //     //else
    //         //send the current state of the game to all the players
    //         io.emit('game-stats', {
    //             points: {
    //                 player1: 2,
    //                 player2: 3,
    //                 player3: 0
    //             },
    //             rounds_left: 2
    //         })
    // })
    client.on('disconnect', ()=>{
        console.log(`client ${client.id} disconnected`);
    })
})
}

module.exports = connectIO;