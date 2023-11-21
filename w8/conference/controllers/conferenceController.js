const ConferenceParticipant = require('../models/ConferenceParticipant');
const fs = require('fs');
const path = require('path');
const participantsFilePath = path.join(__dirname, '../data/participants.json');

const conferenceController = {
	getHomepage: (req, res) => {
		res.render('homepage');
	},

	getConfirmationPage: (req, res) => {
		res.render('confirmation');
	},

	postConfirmationDetails: (req, res) => {
		const { name, email, phone, attendance } = req.body;
		const participant = new ConferenceParticipant(
			name,
			email,
			phone,
			attendance
		);

		let participants = [];
		if (fs.existsSync(participantsFilePath)) {
			const participantsData = fs.readFileSync(
				participantsFilePath,
				'utf8'
			);
			participants = JSON.parse(participantsData);
		}

		participants.push(participant);

		fs.writeFileSync(
			participantsFilePath,
			JSON.stringify(participants, null, 2)
		);

		res.render('participateSuccess', { name });
	},

	getFeedbackPage: (req, res) => {
		try {
			const data = JSON.parse(
				fs.readFileSync(participantsFilePath, 'utf8')
			);
			res.render('feedback', { data });
		} catch (error) {
			console.error('Error reading data.json:', error);
			res.render('feedback', {});
		}
	},
};

module.exports = conferenceController;
