const modalOpenButton = document.getElementById('modalOpenButton');
	const modalCloseButton = document.getElementById('modalCloseButton');
	const modal = document.getElementById('modalContainer');

	modalOpenButton.addEventListener('click', () => {
	  modal.classList.remove('hidden');
	});

	modalCloseButton.addEventListener('click', () => {
	  modal.classList.add('hidden');
	});

// 채팅 리스트 불러오기
let dlist = $("#modalContent");

$("#modalOpenButton").on("click", function() {

	$.ajax({
		url: "/dlist",
		contentType: "application/json;charset=UTF-8",
		dataType: "json",
		success: function(res) {
			console.log(res);

			dlist.empty();

			res.forEach(function(d) {
				var link = "/doctor/" + d.doctorId;

				dlist.append(`
				<table id="dlist">		
                	<tr>
                    	<td>
                    	<a class="detail-link" href="${link}">
                        	${d.doctorName}
                    	</a>
                    	</td>
                	</tr>
				</table>
            `).trigger("create");
			})

			$('.detail-link').on('click', function(event) {
				event.preventDefault();  // 페이지 전환을 막습니다.

				var url = $(this).attr('href');  // 링크의 href 속성을 가져옵니다.

				$.ajax({
					url: url,
					success: function(data) {
						// 새로운 데이터를 받아서 모달 창의 내용을 업데이트합니다.
						console.log(data);
						dlist.empty();
						dlist.append(data);
					},
					error: function() {
						console.log('error');
					}
				});
			});


		},
		error: function() {
			console.log("error")
		}
	})

})




// 채팅 관련
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