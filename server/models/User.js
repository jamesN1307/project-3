const { Schema, model } = require('mongoose')

const userSchema = new Schema(
    {
    username: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true
    },
    // email: {
    //     type: String,
    //     required: [true, 'Please add an email'],
    //     unique: true
    // },
    password: {
        type: String,
        required: [true, 'Please add a password']
    }
}, 
)

const User = model('user', userSchema)

module.exports = User;