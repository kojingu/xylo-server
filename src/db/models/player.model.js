const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
    io_room_id: String,
    socket_id: String,
    nickname: String,
    rounds_won: {
        type: Number,
        default: 0
    }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;