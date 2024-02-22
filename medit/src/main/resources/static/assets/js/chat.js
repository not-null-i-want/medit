const modalOpenButton = document.getElementById('modalOpenButton');
const modalCloseButton = document.getElementById('modalCloseButton');
const modal = document.getElementById('modalContainer');

const chatDiv = $('#chatBox');
/*const msg = $('#messageInput');*/
const sendBtn = $('#sendButton');

modalOpenButton.addEventListener('click', () => {
	modal.classList.remove('hidden');
});

modalCloseButton.addEventListener('click', () => {
	modal.classList.add('hidden');
});

let test = modal.getElementsByClassName("test");

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

				var url1 = $(this).attr('href');  // 링크의 href 속성을 가져옵니다.

				$.ajax({
					url: url1,
					contentType: "application/json;charset=UTF-8",
					dataType: "json",
					success: function(data) {
						// 새로운 데이터를 받아서 모달 창의 내용을 업데이트합니다.
						dlist.empty();

						dlist.append(`<div id="chatBox"></div>
	<input id="messageInput" type="text" class="test">
	<button id="sendButton">Send</button>`).trigger("create");

						data.forEach(function(c) {

							let check = c.doctorId.doctorName == $('.detail-link').innerHTML;

							let msgDiv = `
						<div class="chatBox ${check ? 'broadcater' : ''}">
							<div>
								<div class="message ${check ? 'my' : ''}">${c.chatting}</div>
							</div>
						</div>
							`

							$('#chatBox').append(msgDiv).trigger("create");


						});

						$('#chatBox').scrollTop($('#chatBox')[0].scrollHeight);

						console.log($('#modalCloseButton').text())

						let chat = {
							"roomSeq": `${data[0].roomSeq.roomSeq}`,
							"doctorId": $('#modalCloseButton').text(),
							"chatting": "",
							"emoticon": "",
						}

						const msg = $('#messageInput');

						let websocket = null;
						var url = "ws://localhost:8089/chat";

						$(document).on('click', '#messageInput', function() {
							if (websocket == null || websocket.readyState !== 1) {
								websocket = new WebSocket(url);

								websocket.onopen = function() {
									console.log("연결 성공");
								}

								websocket.onclose = function() {
									console.log("돌아가")
								}
								websocket.onmessage = onMessage;
							}
						});


						$(document).on('click', '#sendButton', msgSend);

						function onMessage(data) {
							console.log(data)
							addChat(JSON.parse(data.data));
						}

						function msgSend() {
							if (msg.val().trim() === '') {
								return;  // 메시지가 빈칸이면 함수를 빠져나갑니다.
							}
							chat.chatting = msg.val();

							websocket.send(JSON.stringify(chat));

							msg.val('');

						}

						function addChat(json) {
							if (json.chatting.trim() === '') {
								return;  // 메시지가 빈칸이면 함수를 빠져나갑니다.
							}

							let check = json.doctorId.doctorId == chat.doctorId;

							let msgDiv = `
	<div class="chatBox">
		<div>
			
			<div class="message ${check ? 'my' : ''}">${json.chatting}</div>
		</div>
	</div>
	`;
							$('#chatBox').append(msgDiv);

							$('#chatBox').scrollTop($('#chatBox')[0].scrollHeight)

						}

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
/*let chat = {
	"roomSeq": $('#roomseq').html(),
	"doctorId": $('#chatter').html(),
	"chatting": "",
	"emoticon": "",
}
*/




/*$("#chatBox").on("click", function() {

	var url = "ws://localhost:8089/chat";

	websocket = new WebSocket(url);

	websocket.onopen = function() {
		console.log("연결 성공");
	}

	websocket.onmessage = onMessage;

	sendBtn.on("click", msgSend);

})*/

