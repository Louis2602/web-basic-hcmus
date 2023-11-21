$(document).ready(function () {
	$('#dateofbirth').datepicker({
		dateFormat: 'dd/mm/yy',
		changeYear: true,
	});
	$('#fullname').on('blur', function () {
		const fullname = $('#fullname').val();
		if (!validateFullName(fullname)) {
			$('#fullname-error').text('*First letter should be capitalized');
		} else {
			$('#fullname-error').text('');
		}
	});
	$('#username').on('blur', function () {
		const username = $('#username').val();
		if (!validateUsername(username)) {
			$('#username-error').text(
				'*No spaces allowed, should only consist of characters, digits, and the underscore, and should not start with a digit'
			);
		} else {
			$('#username-error').text('');
		}
	});

	$('#email').on('blur', function () {
		const email = $('#email').val();
		if (!validateEmail(email)) {
			console.log('error');
			$('#email-error').text(
				'*Invalid email standard format, eg: example@gmail.com'
			);
		} else {
			$('#email-error').text('');
		}
	});
	$('#phonenumber').on('blur', function () {
		const phonenumber = $('#phonenumber').val();
		if (!validatePhoneNumber(phonenumber)) {
			$('#phonenumber-error').text('*Phone number must start with 0');
		} else {
			$('#phonenumber-error').text('');
		}
	});
	$('#dateofbirth').on('blur', function () {
		const dateofbirth = $('#dateofbirth').val();
		if (!validateDateOfBirth(dateofbirth)) {
			$('#dob-error').text('*Age should be between [15, 55]');
		} else {
			$('#dob-error').text('');
		}
	});
	$('.register-form').submit(function (event) {
		event.preventDefault();

		alert('Registration successful!');
		window.location.href = 'signin.html';

		localStorage.setItem('email', $('#email').val());
		localStorage.setItem('username', $('#username').val());
	});
});
