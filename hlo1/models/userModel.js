const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        unique :true,
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
