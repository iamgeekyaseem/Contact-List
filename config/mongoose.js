// require the librarary
const mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://127.0.0.1/contacts_list_db');

//acquire the connection (to check if it is running)
const db = mongoose.connection;

//error
db.on('error', console.error.bind(console, 'error connecting to db'));

//up and running print the message
db.once('open', function(){
    console.log('Suscessfully connected to database');
});