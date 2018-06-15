const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredit = require('../middlewares/requireCredit');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer');

module.exports = (app) => {
	app.post('/api/surveys', requireLogin, requireCredit, (req, res) => {
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
		mailer.send();
	});
};