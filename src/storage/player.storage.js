const Player = require('../db/models/player.model');
const Game = require('../db/models/game.model');

class PlayerStorage {
    async insertPlayerInGame(player, io_room_id){
        const game = await Game.findOne({
            io_room_id
        });
        game.players.push(player);
        await game.save();
    }
    async createPlayer(data){
        const io_room_id = data.io_room_id;
        const newPlayer = new Player(data);
        await newPlayer.save();
        await this.insertPlayerInGame(newPlayer, io_room_id);
        return newPlayer;
    }
    
}

const playerStorage = new PlayerStorage();

module.exports = playerStorage;