const db = require('../storage');
const {updateWinner} = require('./update_winner');

async function verifySonata(client, data){
    const sonataData = {
        guessed_sonata: data.guessed_sonata,
        io_room_id: [...client.rooms][0]
    }
    const isSonata = await db.gameStorage.verifySonata(sonataData);
    if(!isSonata) return false;
    return await updateWinner(client);
}

module.exports = {
    verifySonata
}