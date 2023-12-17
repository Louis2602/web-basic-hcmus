const pool = [];
function emitMessage(message) {
	for (let res of pool) res.end(message);
	pool.length = 0;
}

const messageController = {
	getMessagePage: async (req, res, next) => {
		try {
			res.render('message-poll', {
				title: 'Message Poll Feature',
			});
		} catch (error) {
			next(err);
		}
	},
	getSocketPage: async (req, res, next) => {
		try {
			res.render('message-socket', {
				title: 'Message Poll Feature',
			});
		} catch (error) {
			next(error);
		}
	},
	getMessage: (req, res) => {
		pool.push(res);
	},
	sendMessage: (req, res, next) => {
		try {
			let message = `<b>${req.session?.passport?.user}</b>` + ': ';

			req.on('data', (chunk) => {
				message += chunk;
			});
			req.on('end', () => {
				emitMessage(message);
				res.end();
			});
		} catch (error) {
			next(error);
		}
	},
};

module.exports = messageController;
