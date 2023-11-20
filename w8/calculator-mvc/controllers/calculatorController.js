const calculateResult = (req, res) => {
	const { x, y, operation } = req.body;
	let result;
	switch (operation) {
		case '+':
			result = parseFloat(x) + parseFloat(y);
			break;
		case '-':
			result = parseFloat(x) - parseFloat(y);
			break;
		case '*':
			result = parseFloat(x) * parseFloat(y);
			break;
		case '/':
			result = parseFloat(x) / parseFloat(y);
			break;
		default:
			result = 'Invalid operation';
	}
	console.log(result);
	res.render('index', { result });
};

module.exports = { calculateResult };
