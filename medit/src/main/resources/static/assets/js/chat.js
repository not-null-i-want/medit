let chat = {
	"roomSeq": $('#roomseq').html(),
	"doctorId": $('#chatter').html(),
	"chatting": "",
	"emoticon": "",
}

const chatDiv = $('#chatBox');
const msg = $('#messageInput');
const sendBtn = $('#sendButton');

let websocket;

$(document).ready(function() {

	var url = "ws://localhost:8089/chat";

	websocket = new WebSocket(url);

	websocket.onopen = function() {
		console.log("연결 성공");
	}

	websocket.onmessage = onMessage;

	sendBtn.on("click", msgSend);

})

function onMessage(data) {
	addChat(JSON.parse(data.data));
}

function msgSend() {
	chat.chatting = msg.val();

	websocket.send(JSON.stringify(chat));

	msg.val('');

}

function addChat(json) {

	let check = json.doctorId.doctorId == chat.doctorId;

	let msgDiv = `
	<div class="chatBox ${check ? 'broadcater' : ''}">
		<div>
			<div class="chatUser">${json.doctorId} : </div>
			<div class="message ${check ? 'my' : ''}">${json.chatting}</div>
		</div>
	</div>
	`;

	chatDiv.append(msgDiv);

	chatDiv.scrollTop(chatDiv[0].scrollHeight);

}