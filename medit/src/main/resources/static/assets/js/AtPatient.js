let diagAT = $("#diagnosisDate"); // 진단날짜 쪽 table html추가 
let opinion = $("#opinion"); // 의사소견 쪽 table html 추가

let saveOpinion; // 뒤에 save_opinion할때 객체로만 보낼수 있어서 환자 데이터를 끝까지 가지고갈 변수만들어줌 여기에 diag_seq값 담아줄거임
let selectedDiagAt; // Diagnosis 테이블에서 diag_seq값 담아줄 변수 만듬

let isFirst_AT;
let isLast_AT;
let pageNumber_AT;
let totalPage_AT;
let startPage_AT;
let endPage_AT;

let isHidden = true;
let numtable;
let seletedPtntId;
let tableHtmlAT;
let diagAtList = [];
let table_AT = $("#pageNumberSpace_AT");
let AT_pageNumber = $("#pageNumber_AT");
let currentOpinion;


$(document).on('click', '.selectPtnt', function() {

	seletedPtntId = $(this)[0].cells[0].innerText;
	/*diagAtList = [];*/
	
	// 환자 클릭시 환자 디테일 박스 투명도 애니메이션
	if($("#diagnosisDate").hasClass("diagnosisDateBoxAnim-1") === true){
		$("#diagnosisDate").removeClass("diagnosisDateBoxAnim-1");
		$("#diagnosisDate").addClass("diagnosisDateBoxAnim-2");
	} else {
		$("#diagnosisDate").removeClass("diagnosisDateBoxAnim-2");
		$("#diagnosisDate").addClass("diagnosisDateBoxAnim-1");
	}
	
	if($("#pageNumberSpace_AT").hasClass("pageNumberSpace_ATBoxAnim-1") === true){
		$("#pageNumberSpace_AT").removeClass("pageNumberSpace_ATBoxAnim-1");
		$("#pageNumberSpace_AT").addClass("pageNumberSpace_ATBoxAnim-2");
	} else {
		$("#pageNumberSpace_AT").removeClass("pageNumberSpace_ATBoxAnim-2");
		$("#pageNumberSpace_AT").addClass("pageNumberSpace_ATBoxAnim-1");
	}
	
	
	$.ajax({
		url: "/diagAtPaging",
		data: { "ptntId": seletedPtntId },
		success: function(res) {
		
			// 페이징 관련 변수 저장
			isFirst_AT = res.first;
			isLast_AT = res.last;
			pageNumber_AT = res.number;
			totalPage_AT = res.totalPage;
			startPage_AT = res.startPage;
			endPage_AT = res.endPage;
			
			// 페이징 hidden고나련 숨겨져있는 경우에만 토글 실행하게 하기
			if (isHidden) { 
				$('.hiddenAT').toggle();
				isHidden = false; 
			}
			/*tableHtmlAT = `
			<div id="diagLeftSpace">
						<img src="assets/imgs/firstBtn.svg" id="first_AT"
							class="diagAtMoveBtn"></img> <img src="assets/imgs/preBtn.svg"
							id="pre_AT" class="diagAtMoveBtn"></img>
					</div>
					<div id="pageNumber_AT"></div>
					<div id="diagRightSpace">
						<img src="assets/imgs/nextBtn.svg" id="next_AT" class="diagAtMoveBtn"></img>
						<img src="assets/imgs/lastBtn.svg" id="last_AT" class="diagAtMoveBtn"></img>
					</div>
					`;
			table_AT.html(tableHtmlAT);*/
			
			// 진단 날짜, diag테이블 시퀀스 배열 초기화
			let Arr_ptntAt = [];
			let Arr_diagSeq = [];
			
			// 날짜 포맷 관련
			for (let i = 0; i < res.diagnosis.length; i++) {
				let originalDate = res.diagnosis[i].diagAt
				let diagSeq = res.diagnosis[i].diagSeq
				diagAtList.push(originalDate); // 의사소견을 위해서 배열 하나 만들어서 넣어줌
				let formattedDate = '　　' + originalDate.substring(0, 16).replace('T', '　　　');
				formattedDate = formattedDate.replace(/:/, '시  ') + '분';
				Arr_ptntAt.push(formattedDate);
				Arr_diagSeq.push(diagSeq);
			}

			// 진단 날짜 테이블 생성
				tableHtml = '<table class="diagAtTable">';
				tableHtml += `<tr> <td id="head-cell">진단 날짜</td> </tr>`;
				for (let i = 0; i < res.diagnosis.length; i++) {
					tableHtml += ` 
						<tr class="diagDate">
            			<td class="hidden-cell">${Arr_diagSeq[i]}</td>
           				<td>${Arr_ptntAt[i]}</td>
        				</tr>`;}
				tableHtml += '</table>';
				tableHtml += '<div class="diagAt-icon">' + '<img src="assets/imgs/PatientAt_icon.png" >' + '</div>';
				diagAT.html(tableHtml).trigger("create");
				opinion.html("").trigger("create");
			
			AT_pageNumber = $("#pageNumber_AT");  // 변수선언
			
			// 페이징 숫자, 부등호 생성
			numtable = '<div>';
			for (let i = startPage_AT; i <= endPage_AT; i++) {
				if (i == pageNumber_AT + 1) {
					numtable += `
              			<b><span class="num_AT">${i}</span></b>
                  	`;
				} else {
					numtable += `
              			<span class="pageNumber_AT num">${i}</span>
                  	`;
				}
			}
			numtable += '</div>';
			AT_pageNumber.html(numtable).trigger("create");
		},
		error: function() {
			console.log("error")
		}
	});

});

/////// 다음 페이지 로딩 ///////
$(document).on('click', '#next_AT', function() {
	
	if (!isLast_AT) {
		$.ajax({
			url: "/diagAtPaging",
			data: { "page": pageNumber_AT + 2,
			"ptntId": seletedPtntId
			 },
			success: function(res) {
				
				// 페이징 관련 변수 저장
				isFirst_AT = res.first;
				isLast_AT = res.last;
				pageNumber_AT = res.number;
				startPage_AT = res.startPage;
				endPage_AT = res.endPage;

				// 진단 날짜, diag테이블 시퀀스 배열 초기화
				let Arr_ptntAt = [];
				let Arr_diagSeq = [];

				// 날짜 포맷 관련
				for (let i = 0; i < res.diagnosis.length; i++) {
					let originalDate = res.diagnosis[i].diagAt
					let diagSeq = res.diagnosis[i].diagSeq
					diagAtList.push(originalDate); // 의사소견을 위해서 배열 하나 만들어서 넣어줌
					let formattedDate = '　　' + originalDate.substring(0, 16).replace('T', '　　　');
					formattedDate = formattedDate.replace(/:/, '시  ') + '분';
					Arr_ptntAt.push(formattedDate);
					Arr_diagSeq.push(diagSeq);
				}

				// 진단 날짜 테이블 생성
				tableHtml = '<table class="diagAtTable">';
				tableHtml += `<tr> <td id="head-cell">진단 날짜</td> </tr>`;
				for (let i = 0; i < res.diagnosis.length; i++) {
					tableHtml += ` 
						<tr class="diagDate">
            			<td class="hidden-cell">${Arr_diagSeq[i]}</td>
           				<td>${Arr_ptntAt[i]}</td>
        				</tr>`;}
				tableHtml += '</table>';
				tableHtml += '<div class="diagAt-icon">' + '<img src="assets/imgs/PatientAt_icon.png" >' + '</div>';
				diagAT.html(tableHtml).trigger("create");
				opinion.html("").trigger("create");
			
				let AT_pageNumber = $("#pageNumber_AT"); // 페이징 초기화 필요함 

				// 페이징 숫자, 부등호 생성
				numtable = '<div>';
				for (let i = startPage_AT; i <= endPage_AT; i++) {
					if (i == pageNumber_AT + 1) {
						numtable += `
              			<b><span class="num_AT">${i}</span></b>
                  	`;
					} else {
						numtable += `
              			<span class="num_AT num">${i}</span>
                  	`;
					}
				}
				numtable += '</div>';
				AT_pageNumber.html(numtable).trigger("create");
			},
			error: function() {
				console.log("error")
			}
		});

	};
});


/////// 이전 페이지 로딩 ///////
$(document).on('click', '#pre_AT', function() {

	if (!isFirst_AT) {
		$.ajax({
			url: "/diagAtPaging",
			data: { "page": pageNumber_AT,
			"ptntId": seletedPtntId },
			success: function(res) {
				
				// 페이징 관련 변수 저장
				isFirst_AT = res.first;
				isLast_AT = res.last;
				pageNumber_AT = res.number;
				startPage_AT = res.startPage;
				endPage_AT = res.endPage;
				
				// 진단 날짜, diag테이블 시퀀스 배열 초기화
				let Arr_ptntAt = [];
				let Arr_diagSeq = [];
				
				// 날짜 포맷 관련
				for (let i = 0; i < res.diagnosis.length; i++) {
					// 날짜 포맷 변경
					let originalDate = res.diagnosis[i].diagAt
					let diagSeq = res.diagnosis[i].diagSeq
					diagAtList.push(originalDate); // 의사소견을 위해서 배열 하나 만들어서 넣어줌
					let formattedDate = '　　' + originalDate.substring(0, 16).replace('T', '　　　');
					formattedDate = formattedDate.replace(/:/, '시  ') + '분';
					Arr_ptntAt.push(formattedDate);
					Arr_diagSeq.push(diagSeq);
				}

				// 진단 날짜 테이블 생성
				tableHtml = '<table class="diagAtTable">';
				tableHtml += `<tr> <td id="head-cell">진단 날짜</td> </tr>`;
				for (let i = 0; i < res.diagnosis.length; i++) {
					tableHtml += ` 
						<tr class="diagDate">
            			<td class="hidden-cell">${Arr_diagSeq[i]}</td>
           				<td>${Arr_ptntAt[i]}</td>
        				</tr>`;}
				tableHtml += '</table>';
				tableHtml += '<div class="diagAt-icon">' + '<img src="assets/imgs/PatientAt_icon.png" >' + '</div>';
				diagAT.html(tableHtml).trigger("create");
				opinion.html("").trigger("create");
			
				let AT_pageNumber = $("#pageNumber_AT"); // 페이징 초기화 필요함  

				// 페이징 숫자, 부등호 생성
				numtable = '<div>';
				for (let i = startPage_AT; i <= endPage_AT; i++) {
					if (i == pageNumber_AT + 1) {
						numtable += `
              			<b><span class="num_AT">${i}</span></b>
                  	`;
					} else {
						numtable += `
              			<span class="pageNumber_AT num">${i}</span>
                  	`;
					}
				}
				numtable += '</div>';
				AT_pageNumber.html(numtable).trigger("create");
			},
			error: function() {
				console.log("error")
			}
		});

	};
});


/////// 맨 앞 페이지 로딩 ///////
$(document).on('click', '#first_AT', function() {
	if (!isFirst_AT) {
		
		$.ajax({
			url: "/diagAtPaging",
			data: { "page": 1 ,
			"ptntId": seletedPtntId},
			success: function(res) {

				// 페이징 관련 변수 저장
				isFirst_AT = res.first;
				isLast_AT = res.last;
				pageNumber_AT = res.number;
				startPage_AT = res.startPage;
				endPage_AT = res.endPage;

				// 진단 날짜, diag테이블 시퀀스 배열 초기화
				let Arr_ptntAt = [];
				let Arr_diagSeq = [];
				
				// 날짜 포맷 관련
				for (let i = 0; i < res.diagnosis.length; i++) {
					// 날짜 포맷 변경
					let originalDate = res.diagnosis[i].diagAt
					let diagSeq = res.diagnosis[i].diagSeq

					diagAtList.push(originalDate); // 의사소견을 위해서 배열 하나 만들어서 넣어줌
					let formattedDate = '　　' + originalDate.substring(0, 16).replace('T', '　　　');
					formattedDate = formattedDate.replace(/:/, '시  ') + '분';
					Arr_ptntAt.push(formattedDate);
					Arr_diagSeq.push(diagSeq);
				}

				// 진단 날짜 테이블 생성
				tableHtml = '<table class="diagAtTable">';
				tableHtml += `<tr> <td id="head-cell">진단 날짜</td> </tr>`;
				for (let i = 0; i < res.diagnosis.length; i++) {
					tableHtml += ` 
						<tr class="diagDate">
            			<td class="hidden-cell">${Arr_diagSeq[i]}</td>
           				<td>${Arr_ptntAt[i]}</td>
        				</tr>`;}
				tableHtml += '</table>';
				tableHtml += '<div class="diagAt-icon">' + '<img src="assets/imgs/PatientAt_icon.png" >' + '</div>';
				diagAT.html(tableHtml).trigger("create");
				opinion.html("").trigger("create");
			
				let AT_pageNumber = $("#pageNumber_AT"); // 페이징 초기화 필요함 

				// 페이징 숫자, 부등호 생성
				numtable = '<div>';
				for (let i = startPage_AT; i <= endPage_AT; i++) {
					if (i == pageNumber_AT + 1) {
						numtable += `
              			<b><span class="num_AT">${i}</span></b>
                  	`;
					} else {
						numtable += `
              			<span class="pageNumber_AT num">${i}</span>
                  	`;
					}
				}
				numtable += '</div>';
				AT_pageNumber.html(numtable).trigger("create");
			},
			error: function() {
				console.log("error")
			}
		});

	};
});


/////// 마지막 페이지 로딩 ///////
$(document).on('click', '#last_AT', function() {
	
	if (!isLast_AT) {
		
		$.ajax({
			url: "/diagAtPaging",
			data: { "page": totalPage_AT,
			"ptntId": seletedPtntId },
			success: function(res) {
				
				// 페이징 관련 변수 저장
				isFirst_AT = res.first;
				isLast_AT = res.last;
				pageNumber_AT = totalPage - 1;
				startPage_AT = res.startPage;
				endPage_AT = res.endPage;

				// 진단 날짜, diag테이블 시퀀스 배열 초기화
				let Arr_ptntAt = [];
				let Arr_diagSeq = [];

				// 날짜 포맷 관련
				for (let i = 0; i < res.diagnosis.length; i++) {
					let originalDate = res.diagnosis[i].diagAt
					let diagSeq = res.diagnosis[i].diagSeq
					diagAtList.push(originalDate); // 의사소견을 위해서 배열 하나 만들어서 넣어줌
					let formattedDate = '　　' + originalDate.substring(0, 16).replace('T', '　　　');
					formattedDate = formattedDate.replace(/:/, '시  ') + '분';
					Arr_ptntAt.push(formattedDate);
					Arr_diagSeq.push(diagSeq);
				}


				// 진단 날짜 테이블 생성
				tableHtml = '<table class="diagAtTable">';
				tableHtml += `<tr> <td id="head-cell">진단 날짜</td> </tr>`;
				for (let i = 0; i < res.diagnosis.length; i++) {
					tableHtml += ` 
						<tr class="diagDate">
            			<td class="hidden-cell">${Arr_diagSeq[i]}</td>
           				<td>${Arr_ptntAt[i]}</td>
        				</tr>`;}
				tableHtml += '</table>';
				tableHtml += '<div class="diagAt-icon">' + '<img src="assets/imgs/PatientAt_icon.png" >' + '</div>';
				diagAT.html(tableHtml).trigger("create");
				opinion.html("").trigger("create");

				// 페이징 숫자, 부등호 생성
				numtable = '<div>';
				for (let i = startPage_AT; i <= endPage_AT; i++) {
					if (i == pageNumber_AT + 1) {
						numtable += `
              			<b><span class="num_AT">${i}</span></b>
                  	`;
						/*console.log(i);*/

					} else {
						numtable += `
              			<span class="pageNumber_AT num">${i}</span>
                  	`;
						/*console.log(i);*/
					}
				}
				numtable += '</div>';
				AT_pageNumber.html(numtable).trigger("create");
			},
			error: function() {
				console.log("error")
			}
		});

	};
});


//////////////////// 클릭 페이지 로딩 /////////////////////
$(document).on('click', '.pageNumber_AT', function() {
	
	let selectPageNum_AT = $(this).text(); 
	
	$.ajax({
		url: "/diagAtPaging",
		data: {
			"page": selectPageNum_AT,
			"ptntId": seletedPtntId
		},
		success: function(res) {
			
			// 페이징 관련 변수 저장
			isFirst_AT = res.first;
			isLast_AT = res.last;
			pageNumber_AT = res.number;
			startPage_AT = res.startPage;
			endPage_AT = res.endPage;

			// 진단 날짜, diag테이블 시퀀스 배열 초기화
			let Arr_ptntAt = [];
			let Arr_diagSeq = [];
			
			// 날짜 포맷 관련
			for (let i = 0; i < res.diagnosis.length; i++) {
				let originalDate = res.diagnosis[i].diagAt
				let diagSeq = res.diagnosis[i].diagSeq
				diagAtList.push(originalDate); // 의사소견을 위해서 배열 하나 만들어서 넣어줌
				let formattedDate = '　　' + originalDate.substring(0, 16).replace('T', '　　　');
				formattedDate = formattedDate.replace(/:/, '시  ') + '분';
				Arr_ptntAt.push(formattedDate);
				Arr_diagSeq.push(diagSeq);
			}

			// 진단 날짜 테이블 생성
				tableHtml = '<table class="diagAtTable">';
				tableHtml += `<tr> <td id="head-cell">진단 날짜</td> </tr>`;
				for (let i = 0; i < res.diagnosis.length; i++) {
					tableHtml += ` 
						<tr class="diagDate">
            			<td class="hidden-cell">${Arr_diagSeq[i]}</td>
           				<td>${Arr_ptntAt[i]}</td>
        				</tr>`;}
				tableHtml += '</table>';
				tableHtml += '<div class="diagAt-icon">' + '<img src="assets/imgs/PatientAt_icon.png" >' + '</div>';
				diagAT.html(tableHtml).trigger("create");
				opinion.html("").trigger("create");
			
			let AT_pageNumber = $("#pageNumber_AT"); // 페이징 초기화 필요함 
			
			// 페이징 숫자, 부등호 생성
			numtable = '<div>';
			for (let i = startPage_AT; i <= endPage_AT; i++) {
				if (i == pageNumber_AT + 1) {
					numtable += ` 
              			<b><span class="num_AT">${i}</span></b>
                  	`;
				} else {
					numtable += `
              			<span class="pageNumber_AT num">${i}</span>
                  	`;
				}
			}
			numtable += '</div>';

			AT_pageNumber.html(numtable).trigger("create");
		},
		error: function() {
			console.log("error")
		}
	})
});




//////////////////////////////////////////////////////////////////////////////////////////
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
							<td>${doctorOpinion}</td>
					</table>				
					<div class="opinion-icon">
					<img src="assets/imgs/OpinionSave_icon.png" >
					</div>
					`)

		}
	})
})


/////// 의사소견창 수정 아이콘 누르면 수정하는 부분 ///////
$(document).on('click', '.opinion-icon', function() {
	// 현재 opinion 영역의 내용 가져오기
	currentOpinion = opinion.find('.docOpinion td').text().trim();
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
					<img src="assets/imgs/OpinionSave_icon.png" >
					</div>
					`)
		}
	})
})