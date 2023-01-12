const db = require('../storage');

async function joinRoom(client, data){
    data = JSON.parse(data);
    const roomId = data.roomId;
    const nickname = data.nickname;
    const newPlayerData = {
        io_room_id: roomId,
        socket_id: client.id,
        nickname
    }
    await db.playerStorage.createNewPlayer(newPlayerData);
    return {roomId, nickname}
}

module.exports = joinRoom;
