function validateFullName(fullname) {
	const pattern = /^[A-Z].*$/;
	return pattern.test(fullname);
}

function validateUsername(username) {
	const pattern = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
	return pattern.test(username);
}

function validateEmail(email) {
	const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return pattern.test(email);
}

function validatePhoneNumber(phonenumber) {
	const pattern = /^0[0-9]{9}$/;
	return pattern.test(phonenumber);
}

function validateDateOfBirth(dob) {
	const currentYear = new Date().getFullYear();
	const age = currentYear - parseInt(dob.split('/')[2]);
	return age >= 15 && age <= 55;
}
