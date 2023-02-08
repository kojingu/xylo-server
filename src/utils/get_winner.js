const db = require('../storage');

async function getWinner(client){
    return await db.gameStorage.getWinner([...client.rooms][0])
}

module.exports = {
    getWinner
}
