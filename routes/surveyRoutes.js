const _ = require('lodash');
const { URL } = require('url');
const Path = require('path-parser'); //parse url
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredit = require('../middlewares/requireCredit');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {

	app.get('/api/surveys', requireLogin, async (req, res) => {
		// find user survey don't include recipients fields
		const surveys	= await Survey.find({ _user: req.user.id })
														.select({ recipients: false });

		res.send(surveys);
	});

	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
		res.send('Thanks for voting');
	});

	//redirect from sendgrid
	app.post('/api/surveys/webhooks', (req, res) => {
		const p = new Path('/api/surveys/:surveyId/:choice');

		//filter out the survey response from the user
		_.chain(req.body)
			.map(({ url, email }) => {
				const match = p.test(new URL(url).pathname);
				if (match) {
					return { email, surveyId: match.surveyId, choice: match.choice }
				}
			})
			.compact()
			.uniqBy('email', 'surveyId')
			.each(({ surveryId, email, choice }) => {
				Survey.updateOne({
					_id: surveyId,
					recipients: {
						$elemMatch: { email: email, responded: false }
					}
				}, {
					$inc: { [choice]: 1 },
					$set: { 
						'recipients.$.responded': true,
						'lastResponded': new Date()
					},

				}).exec();
			})
			.value();
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