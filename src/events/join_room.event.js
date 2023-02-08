const {joinGame} = require('../utils/join_game');

async function joinRoom(io, client, data){
    await client.join(data.roomId);
        await client.leave(client.id);
        const {roomId, nickname} = await joinGame(client, data);
        await io.to(roomId).emit('you-joined', roomId);
        await client.broadcast.to(roomId).emit('player-joined', nickname);
        console.log(client.id);
        console.log(client.rooms);
        const clientsInRoom = await io.in(roomId).allSockets()
        console.log(clientsInRoom)
}

module.exports = {
    joinRoom
}
