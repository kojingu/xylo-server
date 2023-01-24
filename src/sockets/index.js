const socketIO = require("socket.io");
const createNewGame = require("./create_new_game.socket");
const joinRoom = require('./join_room.socket');
const sendSonata = require('./send_sonata.socket');
const {verifySonata, updateWinner, getWinner} = require('../sockets/guess_sonata.socket');

function connectIO(server){
    const io = socketIO(server);
    io.on('connection', (client)=>{
    console.log(`client ${client.id} connected`);
    client.on('create-new-game', async (data)=>{
        const room = (Math.floor(Math.random() * 1000000) + 1).toString();
        await client.join(room);
        await client.leave(client.id);
        const {roomId, nickname} = await createNewGame(client, data);
        await io.to(roomId).emit('room-id', roomId);
        const clientsInRoom = await io.in(roomId).allSockets()
        console.log(clientsInRoom)
    })
    client.on('join-room', async (data)=>{
        await client.join(data.roomId);
        await client.leave(client.id);
        const {roomId, nickname} = await joinRoom(client, data);
        await io.to(roomId).emit('you-joined', roomId);
        await client.broadcast.to(roomId).emit('player-joined', nickname);
        console.log(client.id);
        console.log(client.rooms);
        const clientsInRoom = await io.in(roomId).allSockets()
        console.log(clientsInRoom)
    })
    client.on('send-sonata', async (data)=>{
        const sonata = await sendSonata(client, data);
        await client.broadcast.to([...client.rooms][0]).emit('receive-sonata', sonata);
    })
    client.on('guess-sonata', async (data)=>{
            const winInformation = await verifySonata(client, data);
            console.log(winInformation);
            if(winInformation){
                await client.broadcast.to([...client.rooms][0]).emit('player-won-round', winInformation);
                await client.emit('you-win-round', winInformation);
            }
            if(winInformation.rounds_left === 0){
                const gameWinner = await getWinner(client);
                client.broadcast.to([...client.rooms][0]).emit('game-end', {
                    winner: gameWinner,
                })
                //end room
            }
    })
    client.on('producer-wins-round', async ()=>{
        const winInformation = await updateWinner(client);
        console.log(winInformation);
        await client.broadcast.to([...client.rooms][0]).emit('player-won-round', winInformation);
        await client.emit('you-win-round', winInformation);
        if(winInformation.rounds_left === 0){
            const gameWinner = await getWinner(client);
            client.broadcast.to([...client.rooms][0]).emit('game-end', {
                winner: gameWinner,
            })
            //end room
        }
})
    client.on('disconnect', ()=>{
        console.log(`client ${client.id} disconnected`);
    })
})
}

module.exports = connectIO;