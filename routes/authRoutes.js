const passport = require('passport')

module.exports = (app) => {
	app.get(
		'/auth/google', 
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	)

	// handle this incoming request
	app.get(
		'/auth/google/callback', 
		passport.authenticate('google'),
		(req, res) => {
			//go back to the react router /surveys
			res.redirect('/surveys')
		}
	)

	app.get('/api/logout', (req, res) => {
		req.logout()
		res.redirect('/')
	})

	app.get('/api/current_user', (req, res) => {
		res.send(req.user)
	})
}
