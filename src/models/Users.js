const mongoose = require('mongoose')

const Users = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    alamat: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Users', Users);
