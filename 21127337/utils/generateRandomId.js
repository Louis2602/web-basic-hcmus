function randomId() {
	const crypto = require('crypto');

	const randomBuffer = crypto.randomBytes(1);
	const randomValue = randomBuffer.readUInt8(0);

	const maxRange = 255 - 31;

	const scaledValue = Math.floor((randomValue / 255) * maxRange) + 31;

	return scaledValue;
}
module.exports = { randomId };
