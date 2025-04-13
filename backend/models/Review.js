const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    movieId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Movie',
        required : true
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating : {
        type : Number,
        required : true
    },
    comment : {
        type : String,
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;