const socketIO = require("socket.io");
const {createNewGame} = require("./create_new_game.event");
const {joinRoom} = require('./join_room.event');
const {sendSonata} = require('./send_sonata.event');
const {producerWinsRound} = require('./producer_wins_round.event');
const { guessSonata } = require("./guess_sonata.event");

function connectIO(server){
    const io = socketIO(server);
    io.on('connection', (client)=>{

    client.on('create-new-game', async (data)=>{
        await createNewGame(io, client, data);
    })

    client.on('join-room', async (data)=>{
        await joinRoom(io, client, data);
    })

    client.on('send-sonata', async (data)=>{
        await sendSonata(io, client, data);
    })

    client.on('guess-sonata', async (data)=>{
        await guessSonata(io, client, data);
    })
    client.on('producer-wins-round', async ()=>{
        await producerWinsRound(io, client);
})
    client.on('disconnect', ()=>{
        console.log(`client ${client.id} disconnected`);
    })
})
}

module.exports = connectIO;
