// 환자 등록 버튼 클릭 시 이벤트 처리
document.getElementById("plusBtn").addEventListener("click", function() {

let mainSection = $("#main-section");
	
	mainSection.empty();
	mainSection.append(`
		<div class="tabName-2">
			<div class="box">

				<div class="title">
					<span class="block"></span>
					<h1>
						Registration<span></span>
					</h1>
				</div>

				<div class="role">
					<div class="block"></div>
					<p>Patient</p>
				</div>

			</div>
		</div>
		<div id="ptntRegistration">
			<video src="assets/videos/writeDiagnosis.mp4" id="ptntRegistrationVideo" autoplay loop muted></video>
	        <form action="/savePatients" method="post" id="form_Input">
	            <div id="ptntName_rgst" class="rgstCommon">
					<img src="assets/imgs/rgst-name.png" class="rgst_icon_1"/>
	                <label class="rgstLabel">환자명</label>
	                <input id="ptntName" class="rgst_inputBox" name="ptntName" type="text" placeholder="환자명을 입력하세요">
					<div id="ptntGender_rgst">
						<img src="assets/imgs/rgst-gender.png" class="rgst_icon_2"/>
						<label class="rgstLabel">성별</label>
		                <input type="radio" name="ptntGender" value="0" id="male" hidden>
						<label for="male">
							<img src="assets/imgs/registration_male.png" class="genderIcon genderIconPassive" id="maleIcon"/>
						</label>
						<input type="radio" name="ptntGender" value="1" id="female" hidden>
						<label for="female">
		                	<img src="assets/imgs/registration_female.png" class="genderIcon genderIconPassive" id="femaleIcon"/>
						</label>
					</div>
	            </div>
	            <div id="ptntBirth_rgst" class="rgstCommon">
					<img src="assets/imgs/rgst-birth.png" class="rgst_icon_3"/>
	                <label class="rgstLabel">생년월일</label>
	                <input id="ptntBirthdate" class="rgst_inputBox" type="date" name="ptntBirthdate">
	            </div>
	            <div id="ptntPhone_rgst" class="rgstCommon">
					<img src="assets/imgs/rgst-phone.png" class="rgst_icon_4"/>
	                <label class="rgstLabel">연락처</label>
	                <input id="ptntPhone" class="rgst_inputBox" type="text" name="ptntPhone" placeholder="연락처를 입력하세요">
	            </div>
	            <div id="ptntAddr_rgst" class="rgstCommon">
					<img src="assets/imgs/rgst-addr.png" class="rgst_icon_5"/>
	                <label class="rgstLabel">주소</label>
	                <input type="text" id="sample4_postcode" class="rgst_inputBox" placeholder="우편번호" name="addr3">
	                <input type="button" onclick="sample4_execDaumPostcode()" value="우편번호 찾기" class="searchAddr">
	                <input type="text" id="sample4_roadAddress" class="rgst_inputBox" placeholder="도로명주소" name="addr1" >
	        
	                <input type="hidden" id="sample4_jibunAddress" class="rgst_inputBox" placeholder="지번주소">
	                <span id="guide" style="color:#999;display:none"></span>
	                <input type="text" id="sample4_detailAddress" class="rgst_inputBox" placeholder="상세주소" name="addr2">
	        
	                <input type="hidden" id="sample4_extraAddress" placeholder="참고항목"  size="60">
	                <input type="hidden" id="sample4_engAddress" placeholder="영문주소"  size="60" >
	            </div>
	            <div id="ptntBtn_rgst" class="rgstCommon">
	                <input type="submit" value="등록" id="inputBtn" class="rgst_btn">
	                <input type="submit" value="취소" id="outBtn" class="rgst_btn" onclick="window.open('Main')">
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


/* 성별 이미지 눌렀을 때  */
$(document).on('click', '#maleIcon', function(){
	if($(this).hasClass("genderIconPassive")){
		$(this).removeClass("genderIconPassive");
		$(this).addClass("genderIconActive");
		if($("#femaleIcon").hasClass("genderIconActive")){
			$("#femaleIcon").removeClass("genderIconActive");
			$("#femaleIcon").addClass("genderIconPassive");
		}
	}
});
$(document).on('click', '#femaleIcon', function(){
	if($(this).hasClass("genderIconPassive")){
		$(this).removeClass("genderIconPassive");
		$(this).addClass("genderIconActive");
		if($("#maleIcon").hasClass("genderIconActive")){
			$("#maleIcon").removeClass("genderIconActive");
			$("#maleIcon").addClass("genderIconPassive");
		}
	}
});