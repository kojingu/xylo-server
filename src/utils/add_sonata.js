const db = require('../storage');

async function addSonata(client, data){
    const sonataData = {
        current_sonata: data.sonata,
        socket_id: client.id,
        io_room_id: [...client.rooms][0]
    }
    await db.gameStorage.addSonata(sonataData);
    return data.sonata;
}

module.exports = {
    addSonata
}