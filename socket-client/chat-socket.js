

const socket = io("http://localhost:5000/chat", {
	transportOptions: {
		polling: {
			extraHeaders: {
				Authorization: "Basic YmFzaWMtYXV0aC11c2VybmFtZTpiYXNpYy1hdXRoLXBhc3N3b3Jk"
			}
		}
	}
});



const message = document.getElementById('message');
const messages = document.getElementById('messages');



const handleSubmitNewMessage = () => {
  socket.emit('message', { data: message.value })
}



socket.on('message', ({ data }) => {
  	handleNewMessage(data);
})



const handleNewMessage = (message) => {
  	messages.appendChild(buildNewMessage(message));
}



const buildNewMessage = (message) => {
	const li = document.createElement("li");
	li.appendChild(document.createTextNode(message))
	return li;
}

