const socket = io();

const clientsTotal = document.getElementById('clients-total');
const messageContainer = document.getElementById('message-container');
const nameInput = document.getElementById('name-input');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

messageForm.addEventListener('submit', (e) => {
	e.preventDefault();

	sendMessage();
});

socket.on('clients-total', (data) => {
	clientsTotal.innerText = `Total Clients: ${data}`;
});

function sendMessage() {
	if (messageInput.value === '') return;
	const data = {
		name: nameInput.innerText,
		message: messageInput.value,
		dateTime: new Date(),
	};
	socket.emit('message', data);
	addMessageToUI(true, data);
	messageInput.value = '';
}

socket.on('chat-message', (data) => {
	addMessageToUI(false, data);
});

function addMessageToUI(isOwnMessage, data) {
	clearFeedback();
	const element = `
	<li class=${isOwnMessage ? 'message-right' : 'message-left'}>
        <p class="message">
			${data.message}
            <span>${data.name} ⚫: ${moment(data.dateTime).fromNow()}</span>
        </p>
    </li>`;

	if (!document.hasFocus() || document.visibilityState !== 'visible') {
		notifyUser(data.name, data.message);
	}

	messageContainer.innerHTML += element;
	scrollToBottom();
}

function scrollToBottom() {
	messageContainer.scrollTo(0, messageContainer.scrollHeight);
}

messageInput.addEventListener('focus', (e) => {
	socket.emit('feedback', {
		feedback: `${nameInput.innerText} is typing a message...`,
	});
});
messageInput.addEventListener('keypress', (e) => {
	socket.emit('feedback', {
		feedback: `${nameInput.innerText} is typing a message...`,
	});
});
messageInput.addEventListener('blur', (e) => {
	socket.emit('feedback', {
		feedback: '',
	});
});

socket.on('feedback', (data) => {
	clearFeedback();
	const element = `
	    <li class="message-feedback">
            <p class="feedback" id="feedback">
			${data.feedback}
            </p>
        </li>
	`;

	messageContainer.innerHTML += element;
});

function clearFeedback() {
	document.querySelectorAll('li.message-feedback').forEach((element) => {
		element.parentNode.removeChild(element);
	});
}

function notifyUser(sender, message) {
	if (Notification.permission === 'granted') {
		const notification = new Notification(sender, {
			body: message,
		});

		notification.onclick = () => {
			// You can define an action when the notification is clicked
			console.log('Notification clicked!');
		};
	} else if (Notification.permission !== 'denied') {
		Notification.requestPermission().then((permission) => {
			if (permission === 'granted') {
				notifyUser(sender, message);
			}
		});
	}
}
