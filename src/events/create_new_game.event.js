const {createGame} = require('../utils/create_game');

async function createNewGame(io, client, data){
    const room = (Math.floor(Math.random() * 1000000) + 1).toString();
    await client.join(room);
    await client.leave(client.id);
    const {roomId, nickname} = await createGame(client, data);
    await io.to(roomId).emit('room-id', roomId);
    const clientsInRoom = await io.in(roomId).allSockets();
}

module.exports = {
    createNewGame
}
