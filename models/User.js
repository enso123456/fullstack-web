const mongoose = require('mongoose')
const { Schema } = mongoose

// describe the properties of a schema
const userSchema = new Schema({
	googleId: String,
})

mongoose.model('users', userSchema)