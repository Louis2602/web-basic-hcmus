const num1Input = $('.num1');
const num2Input = $('.num2');
const resultInput = $('.res');

const notification = $('.noti-container span');

function calculation() {
	const num1 = parseFloat(num1Input.val());
	const num2 = parseFloat(num2Input.val());

	if (isNaN(num1)) {
		notification.html(
			'Giá trị nhập ở ô <i>Số thứ nhất</i> không phải là số'
		);
	} else if (isNaN(num2)) {
		notification.html(
			'Giá trị nhập ở ô <i>Số thứ hai</i> không phải là số'
		);
	} else {
		const selectedOperation = $("input[name='operation']:checked").val();

		switch (selectedOperation) {
			case 'add':
				resultInput.val(num1 + num2);
				notification.text('Tính thành công');
				break;
			case 'subtract':
				resultInput.val(num1 - num2);
				notification.text('Tính thành công');
				break;
			case 'multiply':
				resultInput.val(num1 * num2);
				notification.text('Tính thành công');
				break;
			case 'divide':
				if (num2 !== 0) {
					resultInput.val(num1 / num2);
					notification.text('Tính thành công');
				} else {
					resultInput.val('');
					notification.text('Lỗi: Chia cho 0');
				}
				break;
			default:
				resultInput.val('');
				notification.text('Lỗi: Chọn một phép tính');
		}
	}
}
