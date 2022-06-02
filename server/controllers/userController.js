const jwt = require('jsonwebtoken')
const bcrypt  = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const cors = require('cors')

// @desc   Register new user
// @route  POST  /api/users
// @access Public
const registerUser = asyncHandler(async(req, res) => {
    const { name, password } = req.body
    if(!name || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // check if user exists
    const userExists = await User.findOne({name})

    if(userExists) {
        res.status(400) 
        throw new Error('That name already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc   Authenticate a user
// @route  POST  /api/users/login
// @access Public
const loginUser = asyncHandler(async(req, res) => {
    const {name, password} = req.body

    // check for user name
    const user = await User.findOne({name})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc   Get user data
// @route  GET  /api/user/me
// @access Private
const getMe = asyncHandler(async(req, res) => {
    res.json({message: 'User data'})
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}