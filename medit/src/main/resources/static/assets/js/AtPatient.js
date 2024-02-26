let diagAt = $("#diagnosisDate"); // 진단날짜 쪽 table html추가 
let opinion = $("#opinion"); // 의사소견 쪽 table html 추가
let saveOpinion; // 뒤에 save_opinion할때 객체로만 보낼수 있어서 환자 데이터를 끝까지 가지고갈 변수만들어줌 여기에 diag_seq값 담아줄거임
let selectedDiagAt; // Diagnosis 테이블에서 diag_seq값 담아줄 변수 만듬 

/////// 환자목록 클릭하면 진단날짜 나오는 부분 ///////
$(document).on('click', '.selectPtnt', function() {

	let seletedPtntId = $(this)[0].cells[0].innerText;
	let diagAtList = [];

	$.ajax({
		url: "ShowPatientAt", // // RestDiagnosis_Controller에 있음
		data: { "ptntId": seletedPtntId },
		success: function(res) {
			
			let Arr_ptntAt = [];
			let Arr_diagSeq = [];

			// 배열에 진단날짜들 담아주는 부분 
			for (let i = 0; i < res.length; i++) {
				// 날짜 포맷 변경
				let originalDate = res[i].diagAt
				let diagSeq = res[i].diagSeq

				diagAtList.push(originalDate); // 의사소견을 위해서 배열 하나 만들어서 넣어줌
				let formattedDate = '　　' + originalDate.substring(0, 16).replace('T', '　 　');
				formattedDate = formattedDate.replace(/:/, '시') + '분';
				Arr_ptntAt.push(formattedDate);
				Arr_diagSeq.push(diagSeq);
			}

			// 테이블 생성
			let tableHtml = '<table class="diagAtTable">';
			tableHtml += `
            <tr>
    			<td id="head-cell">진단 날짜</td>
			</tr>
			`;
			for (let i = 0; i < res.length; i++) {
				tableHtml += `
					<tr class="diagDate">
            			<td class="hidden-cell">${Arr_diagSeq[i]}</td>
           				<td>${Arr_ptntAt[i]}</td>
        			</tr>`;
			}
			tableHtml += '</table>';
			tableHtml += '<div class="circle-icon">' +
				'<img src="assets/imgs/test2.png" >' +
				'</div>';
			diagAt.html(tableHtml).trigger("create"); // jQueru를 사용하여 'diagDetail'이라는 HTML 엘리먼트의 내부 HTML을 'tableHtml'로 설정하는 부분임.
			opinion.html("").trigger("create");// 다른 환자 클릭하면 기존에 띄워져있던 환자 소견 없애주려고 만듬 
			
		}
	}) 
});


/////// 진단날짜 클릭하면 의사소견 나오는 부분 ///////
$(document).on('click', '.diagDate', function() {
	
	$(this).addClass("PtntDiagAtActivity"); 			  // 현재 선택된 요소(this)에 "PtntDiagAt" 클래스를 추가	
	$(this).siblings().removeClass("PtntDiagAtActivity"); // 현재 선택된 요소의 형제 요소들 중에서 "PtntDiagAt" 클래스를 가진 요소들을 찾아서 해당 클래스를 제거, 이 부분은 선택된 요소를 제외한 다른 형제 요소들의 클래스를 조작하는거임
	
	selectedDiagAt = $(this).find('td:eq(0)').text(); // 솔직히 여기 0으로 해도 다적용되는지 잘모르겠음, 복습하기, 환자 테이블코드랑 같은 맥락인듯?

	$.ajax({
		url: "ShowDiagOpinion", // RestDiagnosis_Controller에 있음
		data: { "diagSeq": selectedDiagAt },
		success: function(res) {
			saveOpinion = selectedDiagAt;
			let doctorOpinion = res.doctorOpinion;

			// 아직 진단전이면 공백으로 출력되게
			if (doctorOpinion == null) {
				doctorOpinion = ""
			}

			opinion.html(`
					<table class ="docOpinion"> 
						<tr>
							<td>${doctorOpinion}</td>
						</tr>		
					</table>				
					<div class="opinion-icon">
					<img src="assets/imgs/test2.png" >
					</div>
					`)
					
		} 
	}) 
}) 


/////// 의사소견창 수정 아이콘 누르면 수정하는 부분 ///////
$(document).on('click', '.opinion-icon', function() {
	// 현재 opinion 영역의 내용 가져오기
	let currentOpinion = opinion.find('.docOpinion td').text().trim();
	// textarea로 교체
	opinion.html(`
        <textarea id="editableOpinion">${currentOpinion}</textarea>
        <button class="saveOpinion">Save</button>
    `);
})	


/////// 의사소견창 save버튼 누르면 DB저장하는 부분 ///////
$(document).on('click', '.saveOpinion', function() {
	let saveOpinion = $("#editableOpinion").val();
	$.ajax({
		url: "saveOpinion", // RestDiagnosis_Controller에 있음
		data: {
			"saveOpinion": saveOpinion,
			"saveSeq": selectedDiagAt
		},
		success: function(res) {
			let doctorOpinion = res.doctorOpinion;

			opinion.html(`
					<table class ="docOpinion"> 
						<tr>
							<td>${saveOpinion}</td>
						</tr>		
					</table>				
					<div class="opinion-icon">
					<img src="assets/imgs/test2.png" >
					</div>
					`)
		} 
	}) 
})
