const Game = require('../db/models/game.model');

class GameStorage{
    async createNewGame(newGameData){
        const newGame = new Game(newGameData);
        await newGame.save();
        return newGame;
    }
}

const gameStorage = new GameStorage();

module.exports = gameStorage;