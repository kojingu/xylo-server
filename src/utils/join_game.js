const db = require('../storage');

async function joinGame(client, data){
    const roomId = data.roomId;
    const nickname = data.nickname;
    const newPlayerData = {
        io_room_id: roomId,
        socket_id: client.id,
        nickname
    }
    await db.playerStorage.createPlayer(newPlayerData);
    await db.gameStorage.addPlayer(roomId);
    return {roomId, nickname}
}

module.exports = {
    joinGame
}
