const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    io_room_id: String,
    number_of_players:{
        type: Number,
        default: 1
    },//default 1, increments everytime a new player enters room.
    rounds_left: Number, //set to number of rounds decided by room creator, incremented every time a new round starts.
    current_sonata: {
        type: String,
        default: null
    },//changes everytime a new sonata is sent by director.
    current_producer_id: String, //set to creator of the room, changes everytime a player wins.
    round_winner:{
        type: Boolean,
        default: false
    },//default false, turns true eveytime there is a winner, and is set to false again everytime a new round starts.
    players: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Player'
    }]
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
