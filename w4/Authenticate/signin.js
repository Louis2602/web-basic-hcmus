$(document).ready(function (e) {
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

	$('.signin-form').submit(function (event) {
		event.preventDefault();

		if (
			$('#username').val() == localStorage.getItem('username') &&
			$('#email').val() == localStorage.getItem('email')
		) {
			alert('Sign in successfully!');
		} else {
			alert('Invalid username or email!');
		}
	});
});
