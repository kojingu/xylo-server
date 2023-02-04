const db = require('../storage');

async function updateWinner(client){
    const winnerUpdateData = {
        io_room_id: [...client.rooms][0],
        socket_id: client.id,
    }
    return await db.gameStorage.updateWinner(winnerUpdateData);
}

module.exports = {
    updateWinner
}
