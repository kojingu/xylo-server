//Connect to mongo database using mongoose
const mongoose = require('mongoose');
//const {DB_HOST, DB_USER, DB_PASS} = require('./config')
const uri = `mongodb://root:password@localhost:27017/`;
//mongodb://root:password@localhost:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false

function connectToDatabase(){
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log('[db] Succesfully connected'))
    .catch((err)=>console.error(`[db] ${err}`));
}
connectToDatabase();
//module.exports = connectToDatabase;
