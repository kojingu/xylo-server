const Game = require('../db/models/game.model');
const Player = require('../db/models/player.model')

class GameStorage{
    async createNewGame(newGameData){
        const newGame = new Game(newGameData);
        await newGame.save();
        return newGame;
    }
    async addSonata(data){
        const current_sonata = data.current_sonata;
        const socket_id = data.socket_id;
        const player = await Player.findOne({socket_id})
        const io_room_id = player.io_room_id;
        await Game.updateOne({io_room_id},
        {
            current_sonata,
            current_producer_id: socket_id
        }
        )
    }
}

const gameStorage = new GameStorage();

module.exports = gameStorage;