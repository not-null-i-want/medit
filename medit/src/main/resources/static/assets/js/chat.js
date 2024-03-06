const modalOpenButton = document.getElementById('modalOpenButton');
const modalCloseButton = document.getElementById('modalCloseButton');
const modal = document.getElementById('modalContainer');

let websocket = null;
var url = "ws://192.168.219.46:8089/chat";

modalOpenButton.addEventListener('click', () => {
	modal.classList.remove('hidden');
});

modalCloseButton.addEventListener('click', () => {
	modal.classList.add('hidden');

	if (websocket != null && websocket.readyState === 1) {
		websocket.close();
		console.log("웹소켓 연결 종료");
	}
});

let test = modal.getElementsByClassName("test");

// 채팅 리스트 불러오기
let dlist = $("#modalContent");

$("#close").click(function() {
	$("#modalContainer").fadeOut();
	$("#close").css("width", "0px");
	$("#close").css("height", "0px");
});



$("#modalOpenButton").on("click", function() {
	var sa = $(this).text();
	$(this).text("");
	$(this).addClass("ball");
	setTimeout(function() {
		$("#modalContainer").fadeIn();
		$("#close").css("width", "30px");
		$("#close").css("height", "30px");
		setTimeout(function() {
			$("#modalOpenButton").removeClass("ball");
			$("#modalOpenButton").text(sa);
		}, 1);
	}, 1);

	$('#modalContainer').css('height', '150%');

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
				<div class="chatUserList">
				<img src="assets/imgs/dicon.png" class="dicon">
                    	<a class="detail-link" href="${link}">
                        	${d.doctorName}
                    	</a>
                    	</div> 
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
							<img src="assets/imgs/send.png" id="sendButton">`).trigger("create");

						data.forEach(function(c) {
							let check = c.doctorId.doctorId == $('#modalCloseButton').text();
							let imgSrc = check ? 'assets/imgs/dicon.png' : 'assets/imgs/dicon.png';
							let content = check ? `${c.chatting}<img src="${imgSrc}" class="dicon">` : `<img src="${imgSrc}" class="dicon">${c.chatting}`;

							let msgDiv = `
						        <div class="chatBox">
						            <div>
						                <div class="message ${check ? 'my' : ''}">
						                    ${content}
						                </div>
						            </div>
						        </div>
						    `;
							$('#chatBox').append(msgDiv).trigger("create");
						});

						setTimeout(() => {
							$('#chatBox').scrollTop($('#chatBox')[0].scrollHeight);
						}, 100);

						console.log($('#modalCloseButton').text())

						$('#modalContainer').css('height', '350%');

						const msg = $('#messageInput');

						let chat = {
							"roomSeq": `${data[0].roomSeq.roomSeq}`,
							"doctorId": $('#modalCloseButton').text(),
							"chatting": "",
							"emoticon": "",
						}


						function msgSend() {
							if (msg.val().trim() === '') {
								return;  // 메시지가 빈칸이면 함수를 빠져나갑니다.
							}
							chat.chatting = msg.val();

							websocket.send(JSON.stringify(chat));

							msg.val('');

						}

						$(document).on('keypress', '#messageInput', function(event) {
							if (event.which == 13) {
								event.preventDefault();  // 엔터키를 눌렀을 때의 기본 동작(예: 폼 제출)을 막음
								msgSend();
							}
						});

						function onMessage(data) {
							console.log(data)
							addChat(JSON.parse(data.data));
						}


						function addChat(json) {
							if (json.chatting.trim() === '') {
								return;  // 메시지가 빈칸이면 함수를 빠져나갑니다.
							}

							let check = json.doctorId.doctorId == chat.doctorId;
							let imgSrc = check ? 'assets/imgs/dicon.png' : 'assets/imgs/dicon.png';
							let content = check ? `${json.chatting}<img src="${imgSrc}" class="dicon">` : `<img src="${imgSrc}" class="dicon">${json.chatting}`;

							let msgDiv = `
								<div class="chatBox">
							        <div>
							            <div class="message ${check ? 'my' : ''}">
							                ${content}
							            </div>
							        </div>
							    </div>
							`;
							$('#chatBox').append(msgDiv);

							$('#chatBox').scrollTop($('#chatBox')[0].scrollHeight)

						}


						if (websocket == null || websocket.readyState !== 1) {
							websocket = new WebSocket(url);

							websocket.onopen = function() {
								console.log("연결 성공");
							}

							websocket.onmessage = onMessage;
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

$('body').on('mouseup', function(event) {
	if (!$(event.target).closest('#modalContainer').length) {
		$("#modalContainer").fadeOut();
	}
}) 
