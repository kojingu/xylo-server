const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    io_room_id: String,
    number_of_players:{
        type: Number,
        default: 1
    },
    rounds_left: Number,
    current_sonata: {
        type: String,
        default: null
    },
    current_producer_id: String,
    round_winner:{
        type: Boolean,
        default: false
    },
    players: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Player'
    }]
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
