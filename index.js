const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const keys = require('./config/keys')

require('./models/User')

require('./services/passport')

mongoose.connect(keys.mongoURI)
 
const app = express()

app.use(bodyParser.json())
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, // expires for 30 days 
		keys: [keys.cookieKey]
	})
)
app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)

const port = process.env.port || 5000

app.listen(port)
