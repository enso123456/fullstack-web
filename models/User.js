const mongoose = require('mongoose')
const { Schema } = mongoose

// describe the properties of a schema
const userSchema = new Schema({
	googleId: String,
	credits: {
		type: Number,
		default: 0
	}
})

mongoose.model('users', userSchema)