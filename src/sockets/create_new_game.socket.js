function createNewGame(io, client, data){
    let roomId = client.id;
    io.to(client.id).emit('room-id', roomId);
    //room id saved to database
        //client id saved to database
        //nickname is saved to database
        //courrent round set to 1

}


module.exports = createNewGame;