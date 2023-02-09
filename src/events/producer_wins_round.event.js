const {updateWinner} = require('../utils/update_winner');
const {getWinner} = require('../utils/get_winner');

async function producerWinsRound(io, client){
    const winInformation = await updateWinner(client);
    await client.broadcast.to([...client.rooms][0]).emit('player-won-round', winInformation);
    await client.emit('you-win-round', winInformation);
    if(winInformation.rounds_left === 0){
        const gameWinner = await getWinner(client);
        client.broadcast.to([...client.rooms][0]).emit('game-end', {
            winner: gameWinner,
        })
        //end room
    }
}

module.exports = {
    producerWinsRound
}
