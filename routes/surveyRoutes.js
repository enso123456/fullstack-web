const _ = require('lodash');
const { URL } = require('url');
const Path = require('path-parser');//parse url
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredit = require('../middlewares/requireCredit');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer');

module.exports = (app) => {

	app.get('/api/surveys/thanks', (req, res) => {
		res.send('Thanks for voting');
	});

	app.post('/api/surveys/webhooks', (req, res) => {

		const events = _.map(req.body, ({ url, email }) => {
			const pathname = new URL(url).pathname;
			const p = new Path('/api/surveys/:surveyId/:choice');
			const match = p.test(pathname);

			if (match) {
				return {
					email,
					surveyId: match.surveyId,
					choice: match.choice
				}
			}
		});
	});

	app.post('/api/surveys', requireLogin, requireCredit, async (req, res) => {
		const { title, subject, body, recipients } = req.body;

		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(',').map(email => ({ email:email.trim() })),
			_user: req.user.id,
			dateSent: Date.now(),
		})

		//send an email
		const mailer = new Mailer(survey, surveyTemplate(survey));

		try  {
			await mailer.send();
			await survey.save();

			req.user.credits -= 1;
			const user = await req.user.save();

			res.send(user);
		} catch (err) {
			res.status(422).send(err)
		}
	});
};