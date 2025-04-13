const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

const connectDB = () => {
    db.on('open', () => {
        console.log("Database connected");
    })

    db.on('error', () => {
        console.error.bind(console, 'connection error:');
    })
}


module.exports = { db , connectDB };
