const db = require('../storage');

async function verifySonata(client, data){
    const sonataData = {
        guessed_sonata: data.guessed_sonata,
        io_room_id: [...client.rooms][0]
    }
    console.log(sonataData);
    const isSonata = await db.gameStorage.verifySonata(sonataData);
    if(!isSonata) return false;
    return await updateWinner(client);
}

async function updateWinner(client){
    const winnerUpdateData = {
        io_room_id: [...client.rooms][0],
        socket_id: client.id,
    }
    return await db.gameStorage.updateWinner(winnerUpdateData);
}

async function getWinner(client){
    return await db.gameStorage.getWinner([...client.rooms][0])
}

module.exports = {
    verifySonata,
    updateWinner,
    getWinner
}
