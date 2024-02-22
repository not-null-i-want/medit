// 환자 등록 버튼 클릭 시 이벤트 처리
document.getElementById("plusBtn").addEventListener("click", function() {

	// input 창 생성
	let inputDiv = $("#inputPtnt");
	//let videoSec = $("#video-section");
	// var inputDiv = document.getElementById("inputPtnt");
	
	inputDiv.empty()
	
	// videoSec.html("")
	
	inputDiv.append(`
	<div id="inputDiv_Title">
		<b id="patientPlus">환자등록</b>
	</div>
	<div id="inputDiv_Input">
    <form action="/savePatients" method="post" id="form_Input">
    환자명<br>
    <input id="ptntName" name="ptntName" type="text" placeholder="환자명을 입력하세요">
    <input id="ptntGender" type="radio" name="ptntGender" value="0">남
    <input id="ptntGender" type="radio" name="ptntGender" value="1">여<br>
    <br>
    생년월일
	<br>
    <input id="ptntBirthdate" type="date" name="ptntBirthdate"><br><br><br>
    연락처<br>
	<input id="ptntPhone" type="text" name="ptntPhone" placeholder="연락처를 입력하세요"><br><br>
    ID<br>
	<input id="doctorId" type="text" name="doctorId" placeholder="ID를 입력하세요"><br><br><br>
    주소
	<br>
	<input type="text" id="sample4_postcode" placeholder="우편번호" name="addr3">
	<input type="button" onclick="sample4_execDaumPostcode()" value="우편번호 찾기" class="searchAddr"><br><br>
	<input type="text" id="sample4_roadAddress" placeholder="도로명주소" size="60" name="addr1" ><br><br>
	<input type="hidden" id="sample4_jibunAddress" placeholder="지번주소"  size="60">
	<span id="guide" style="color:#999;display:none"></span>
	<input type="text" id="sample4_detailAddress" placeholder="상세주소"  size="60" name="addr2"><br>
	<input type="hidden" id="sample4_extraAddress" placeholder="참고항목"  size="60">
	<input type="hidden" id="sample4_engAddress" placeholder="영문주소"  size="60" ><br>
	<br><br>
	<input type="submit" value="등록　" id="inputBtn">
	<input type="submit" value="취소　" id="outBtn"  onclick="window.open('Main')">
	</div>
</form>

</div>

    `).trigger("create");
});

// 우편번호 버튼 클릭시
$(document).on('click', '.searchAddr', searchAddress);

function searchAddress() {
	new daum.Postcode({
		oncomplete: function(data) {
			// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

			// 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
			// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
			var roadAddr = data.roadAddress; // 도로명 주소 변수
			var extraRoadAddr = ''; // 참고 항목 변수

			// 법정동명이 있을 경우 추가한다. (법정리는 제외)
			// 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
			if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
				extraRoadAddr += data.bname;
			}
			// 건물명이 있고, 공동주택일 경우 추가한다.
			if (data.buildingName !== '' && data.apartment === 'Y') {
				extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
			}
			// 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
			if (extraRoadAddr !== '') {
				extraRoadAddr = ' (' + extraRoadAddr + ')';
			}

			// 우편번호와 주소 정보를 해당 필드에 넣는다.
			document.getElementById('sample4_postcode').value = data.zonecode;
			document.getElementById("sample4_roadAddress").value = roadAddr;
			document.getElementById("sample4_jibunAddress").value = data.jibunAddress;
			document.getElementById("sample4_engAddress").value = data.addressEnglish;

			// 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
			if (roadAddr !== '') {
				document.getElementById("sample4_extraAddress").value = extraRoadAddr;
			} else {
				document.getElementById("sample4_extraAddress").value = '';
			}

			var guideTextBox = document.getElementById("guide");
			// 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
			if (data.autoRoadAddress) {
				var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
				guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
				guideTextBox.style.display = 'block';

			} else if (data.autoJibunAddress) {
				var expJibunAddr = data.autoJibunAddress;
				guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
				guideTextBox.style.display = 'block';
			} else {
				guideTextBox.innerHTML = '';
				guideTextBox.style.display = 'none';
			}
		}
	}).open();
}
/////////////////////////////////////////////////////////////////////////////////////////////
/*// 작성버튼 발생시 
$("#inputBtn").on('click',inputPtnt);
function inputPtnt() {
	$.ajax({
		url: "/savePatients",
		method: "post",
		data: {
			ptntName : $("#ptntName").val(),
			ptntGender : $("#ptntGender").val(),
			ptntBirthdate : $("#ptntBirthdate").val(),
			ptntPhone : $("#ptntPhone").val(),
			doctorId : $("#doctorId").val()},
			success : function(){
				alert("굿")
			},
			error : function(){
				alert("다시해라");
			}
	})*/
// 취소버튼 발생시	
//$(document).on('click', "#outButton", inputPtnt);







