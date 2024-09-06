const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

const notificationSound= new Audio('notification.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message'); 
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    notificationSound.play();
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(You: ${message}, 'right');
    socket.emit('send', message);
});

const name = prompt('Enter your name to join');
if (name) {
    socket.emit('new-user-joined', name);
} else {
    alert("You must enter a name to join the chat.");
}

socket.on('user-joined', name => {
    append(${name} joined the chat, 'right');
});

socket.on('receive', data => {
    append(${data.name}: ${data.message}, 'left');
});

socket.on('left', name => {
    append(${name} left the chat, 'right');
});