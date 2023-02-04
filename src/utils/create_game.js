const db = require('../storage');

async function createGame(client, data){
    let roomId = [...client.rooms][0];
    let nickname = data.nickname;
    const newGameData = {
        io_room_id: roomId,
        rounds_left: data.numberOfRounds,
        current_producer_id: client.id,
    }
    const newPlayerData = {
        io_room_id: roomId,
        socket_id: client.id,
        nickname
    }
    const newGame = await db.gameStorage.createGame(newGameData);
    await db.playerStorage.createPlayer(newPlayerData);
    return {roomId, nickname};
}

module.exports = {
    createGame
}
