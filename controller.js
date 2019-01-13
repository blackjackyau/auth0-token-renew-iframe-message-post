window.onload = function() {
	// Get the window displayed in the iframe.
	var receiver = document.getElementById('receiver').contentWindow;
  
	// Get a reference to the 'Send Message' button.
	var btn = document.getElementById('send');

	// A function to handle sending messages.
	function sendMessage(e) {
		// Prevent any default browser behaviour.
		e.preventDefault();
		console.log("Sending message");

		// Send a message with the text 'Hello World!' to the receiver window.
		receiver.postMessage('Hello World', '*');
	}

	// Add an event listener that will execute the sendMessage() function
	// when the send button is clicked.
	btn.addEventListener('click', sendMessage);

	// A function to process messages received by the window.
	function receiveAcknowledgeMessage(e) {
		console.log("receiveAcknowledgeMessage");
		console.log(e);
		// Update the div element to display the message.
		var ackDiv = document.getElementById('ack');
		ackDiv.innerHTML = e.data;
	}

	// Setup an event listener that calls receiveMessage() when the window
	// receives a new MessageEvent.
	window.addEventListener('message', receiveAcknowledgeMessage);
}
