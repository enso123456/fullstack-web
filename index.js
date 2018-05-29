const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('./config/keys')

const app = express()

passport.use(
	new GoogleStrategy(
	{
		clientID: keys.googleClientId,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback'
	}, 
	(accessToken, refreshToken, profile, done) => {
		//from the google callback response access token
		console.log('access token', accessToken)
		console.log('refresh token', refreshToken)
		console.log('profile', profile)
	})
)

app.get('/auth/google', passport.authenticate('google', {
	scope: ['profile', 'email']
}))

// handle this incoming request
app.get('/auth/google/callback', passport.authenticate('google'))

const port = process.env.PORT || 5000

app.listen(port)
