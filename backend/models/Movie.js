const mongoose = require('mongoose');
const movieSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true,
    },
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    genre : {
        type : String,
        enum : ['action' , 'comedy' , 'drama' , 'romance' , 'cartoon'],
        required : true
    },
    director : String,
    actors : [{
        type  : String
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;