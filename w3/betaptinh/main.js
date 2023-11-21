const num1Input = document.querySelector('.num1');
const num2Input = document.querySelector('.num2');
const resultInput = document.querySelector('.res');

const addButton = document.querySelector('.add');
const subtractButton = document.querySelector('.subtract');
const multiplyButton = document.querySelector('.multiply');
const divideButton = document.querySelector('.divide');

const notification = document.querySelector('.noti-container span');

function calculation() {
	const num1 = parseFloat(num1Input.value);
	const num2 = parseFloat(num2Input.value);

	if (isNaN(num1)) {
		notification.innerHTML =
			'Giá trị nhập ở ô <i>Số thứ nhất</i> không phải là số';
	} else if (isNaN(num2)) {
		notification.innerHTML =
			'Giá trị nhập ở ô <i>Số thứ hai</i> không phải là số';
	} else {
		// Check which operation is selected and perform the calculation
		if (addButton.checked) {
			resultInput.value = num1 + num2;
			notification.textContent = 'Tính thành công';
		} else if (subtractButton.checked) {
			resultInput.value = num1 - num2;
			notification.textContent = 'Tính thành công';
		} else if (multiplyButton.checked) {
			resultInput.value = num1 * num2;
			notification.textContent = 'Tính thành công';
		} else if (divideButton.checked) {
			if (num2 !== 0) {
				resultInput.value = num1 / num2;
				notification.textContent = 'Tính thành công';
			} else {
				resultInput.value = '';
				notification.textContent = 'Lỗi: Chia cho 0';
			}
		} else {
			resultInput.value = '';
			notification.textContent = 'Lỗi: Chọn một phép tính';
		}
	}
}
