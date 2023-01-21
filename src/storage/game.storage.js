const Game = require('../db/models/game.model');
const Player = require('../db/models/player.model')

class GameStorage{
    // async getGame(data){
    //     const socket_id = data.socket_id;
    //     const player = await Player.findOne({socket_id});
    //     const 
    // }
    async createNewGame(newGameData){
        const newGame = new Game(newGameData);
        await newGame.save();
        return newGame;
    }
    async addPlayer(io_room_id){
        await Game.updateOne({io_room_id},
            {$inc: {number_of_players: 1}},
            )
    }
    async addSonata(data){
        const current_sonata = data.current_sonata;
        const socket_id = data.socket_id;
        const io_room_id = data.io_room_id;
        //const player = await Player.findOne({socket_id})
        //const io_room_id = player.io_room_id;
        await Game.updateOne({io_room_id},
        {
            current_sonata,
            current_producer_id: socket_id,
            round_winner: false
        }
        )
    }
    async verifySonata(data){
        const current_sonata = data.guessed_sonata;
        const io_room_id = data.io_room_id;
        const isSonata = await Game.findOne({
            current_sonata,
            io_room_id,
            round_winner: false
        })
        console.log(isSonata);
        if(!isSonata) return false;
        return true;
    }
    async updateWinner(data){
        const io_room_id = data.io_room_id;
        const socket_id = data.socket_id;
        await Game.updateOne({io_room_id},
        {$inc: {rounds_left: -1},
        round_winner: true
        })
        await Player.updateOne({socket_id},
            {$inc: {rounds_won: 1}},
        );
        const game = await Game.findOne({io_room_id},
            {rounds_left: 1});
        const player = await Player.findOne({socket_id},
            {nickname: 1})
        return {
            nickname: player.nickname,
            rounds_left: game.rounds_left
        }
    }
    async getWinner(io_room_id){
        const game = await Game.findOne({io_room_id})
        .populate('players');
        const players = game.players
        const player = players.sort((a,b) => b.rounds_won - a.rounds_won)[0];
        return player.nickname
    }
}

const gameStorage = new GameStorage();

module.exports = gameStorage;
