const passport = require('passport')

module.exports = (app) => {
	app.get('/auth/google', passport.authenticate('google', {
		scope: ['profile', 'email']
	}))

	// handle this incoming request
	app.get('/auth/google/callback', passport.authenticate('google'))
}
