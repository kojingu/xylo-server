const db = require('../storage');

async function sendSonata(client, data){
    const sonataData = {
        current_sonata: data.sonata,
        socket_id: client.id
    }
    await db.gameStorage.addSonata(sonataData);
    return data.sonata;
}


module.exports = sendSonata;