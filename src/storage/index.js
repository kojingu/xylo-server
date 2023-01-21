const gameStorage = require('./game.storage');
const playerStorage = require('./player.storage');
const connectToDatabase = require('../db/connection');

connectToDatabase();
const db = {
    gameStorage,
    playerStorage,
    connectToDatabase
}

module.exports = db;