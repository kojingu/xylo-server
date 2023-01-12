const db = require('../storage');

async function createNewGame(client, data){
    let roomId = client.id;
    data = JSON.parse(data);
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
    const newGame = await db.gameStorage.createNewGame(newGameData);
    await db.playerStorage.createNewPlayer(newPlayerData);
    return {roomId, nickname};
}


module.exports = createNewGame;