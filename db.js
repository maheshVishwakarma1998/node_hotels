const mongoose =require('mongoose');
require('dotenv').config();


// const mongoURL = process.env.MONGODB_URL_LOCAL;
const mongoURL = process.env.MONGODB_URL

// setup mongoDB connection
mongoose.connect(mongoURL, {

    useNewUrlParser: true,
    useUnifiedTopology: true

});


// get the default connection
// mongoose maintain a default connection object representing the mongoDB connection.
const db = mongoose.connection;

// Define event listeners for database connection

db.on('connected', () => {
    console.log('connected to mongoDB server');
});

db.on('error', (err) => {
    console.log('connection error');
});

db.on('disconnected', () => {
    console.log('mongoDB disconnected');
});

// export thr database connection

module.exports = db;

