const pool = [];
function emitMessage(message) {
	for (let res of pool) res.end(message);
	pool.length = 0;
}

const messageController = {
	getMessagePage: async (req, res, next) => {
		try {
			res.render('message', {
				title: 'Message Feature',
			});
		} catch (error) {
			next(err);
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
