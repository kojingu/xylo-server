const db = require('../storage');

async function sendSonata(client, data){
    data = JSON.parse(data);
    const sonataData = {
        current_sonata: data.sonata,
        socket_id: client.id
    }
    await db.gameStorage.addSonata(sonataData);
}


module.exports = sendSonata;