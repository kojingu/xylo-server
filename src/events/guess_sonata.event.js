const {verifySonata} = require('../utils/verify_sonata');
const {getWinner} = require('../utils/get_winner');

async function guessSonata(io, client, data){
    const winInformation = await verifySonata(client, data);
            if(winInformation){
                await client.broadcast.to([...client.rooms][0]).emit('player-won-round', winInformation);
                await client.emit('you-win-round', winInformation);
            }
            if(winInformation.rounds_left === 0){
                const gameWinner = await getWinner(client);
                client.broadcast.to([...client.rooms][0]).emit('game-end', {
                    winner: gameWinner,
                })
                //end room
            }
}

module.exports = {
    guessSonata
}
