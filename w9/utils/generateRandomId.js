function randomId() {
	const crypto = require('crypto');
	return crypto.randomBytes(1).readUInt8(0);
}

module.exports = { randomId };
