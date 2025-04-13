const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : String,
    createdAt : {
        type : Date,
        default : Date.now,
    },
    email  : {
        type : String,
        unique : true
    },
    password : String,
    role : {
        type : String,
        enum: ['user', 'admin' , 'blogger'],
        default : 'user'
    },
    following : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    followers : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }]

})

const User = mongoose.model('User', UserSchema);
module.exports = User;