const {addSonata} = require('../utils/add_sonata');

async function sendSonata(io, client, data){
    const sonata = await addSonata(client, data);
    await client.broadcast.to([...client.rooms][0]).emit('receive-sonata', sonata);
}

module.exports = {
    sendSonata
}
