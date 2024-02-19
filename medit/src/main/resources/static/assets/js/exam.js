$(".test").on("click", selectPtnt1);
$(".test").on("click", selectPtnt2);
$(".diag").on("click", selectPtnt3);
$(".edit-opinion").on("click", selectPtnt4);

let ptnt_id = null;

function selectPtnt1() {
	let ptnt_id = $(this).find(".ptntId").html();

	$.ajax({

		url: "PtntDetail1",
		type: "post",
		data: ({
			"PTNT_ID": ptnt_id
		}),
		success: function(res) {
			if(res.ptntGender == 0) {
				res.ptntGender = "남자"
			}else {
				res.ptntGender = "여자"
			}
			
			if(res.ptntType == 0) {
				res.ptntType = "입원"
			}else {
				res.ptntType = "퇴원"
			}
			$('#output-doctorName').text(res.doctorId.doctorName);
			$('#output-ptntAddr').text(res.ptntAddr);
			$('#output-ptntBirthdate').text(res.ptntBirthdate);
			$('#output-ptntGender').text(res.ptntGender);
			$('#output-ptntId').text(res.ptntId);
			$('#output-ptntName').text(res.ptntName);
			$('#output-ptntPhone').text(res.ptntPhone);
			$('#output-ptntType').text(res.ptntType);

		},
		error: function() {
			alert("testjs");
		}

	})
}

function selectPtnt2() {
	let ptnt_id = $(this).find(".ptntId").html();
	/*$.ajax({
		
		url: "PtntDetail2",
		type: "post",
		data : ({
			"PTNT_ID" : ptnt_id
		}),
		success : function(res){
			
			$('#Date1').text(res[0].diagAt);
			$('#Date2').text(res[1].diagAt);
			$('#Date3').text(res[2].diagAt);
			$('#Date4').text(res[3].diagAt);
			$('#Date5').text(res[4].diagAt);
			console.log(res)
		},
		error : function(){
			alert("testjs2");
		}
		
	})*/

	/*$.ajax({
	url: "PtntDetail2",
	type: "post",
	data: {
		"PTNT_ID": ptnt_id
	},
	success: function (res) {
		for (let i = 0; i < res.length; i++) {
			// 만약 res[i].diagAt 값이 비어 있다면 공백 문자열로 설정
			let diag = res[i].diagAt ? res[i].diagAt : "0";
			$('#Date' + (i + 1)).text(diag);     // 만약 진료를 5번받은 환자가 있고 2번받은 환자가 있다면, 5번받은 환자 차트 본후 2번본 환자를 누르면 3,4,5번째 차트에 5번째 환자의 텍스트가 그대로있는 문제가 있음
			
			}
		console.log(res);
	},
	error: function () {
		alert("testjs2");
	}
});*/
$('#AAA').data('ptnt_id', ptnt_id); // 여기 테스트로 넣어줌 ★
	$.ajax({
		url: "PtntDetail2",
		type: "post",
		data: {
			"PTNT_ID": ptnt_id
		},
		success: function(res) {
			
			// 기본값으로 "0"을 넣은 배열 생성
			let diagArray = Array(5).fill("");  // 방법이 여러개일듯, 이중 for문 조건식걸든가 배열 미리생성해서 해당값에 
			let formattedDate; 
			
			console.log(res)
			
			// 받아온 데이터가 있을 경우 해당 위치에 값을 대입
			for (let i = 0; i < res.length && i < 5; i++) {
				diagArray[i] = res[i].diagAt;
				
			}

			for (let i = 0; i < 5; i++) {
				if (i < res.length) {
					let formattedDate = diagArray[i].substring(0, 16).replace('T', ' ');
					 formattedDate = formattedDate.replace(/:/, '시 ') + '분';
					$('#Date' + (i + 1)).text(formattedDate);
				} else {
					$('#Date' + (i + 1)).text("");
				}
				
			}
		
		},
		error: function() {
			alert("testjs2");
		}
	});

}

function selectPtnt3() {
	/*let ptnt_id = $(this).find(".diagId").html();  // 여기 find값이랑 html에서 tr태그 id값이 .idagId로 같으니까 에러가남 */
	let ptnt_id = $('#AAA').data('ptnt_id'); // 여기까지하다가잠 
	
	$.ajax({
		url: "PtntDetail3",
		type: "post",
		data: ({
			"PTNT_ID": ptnt_id
		}),
		success: function(res) {
			
			
			$('#content').text(res[0].doctorOpinion);
			
			/*console.log(res);
*/			
		},
		error: function() {
			alert("testjs3");
		}

	})
}

function selectPtnt4() {
let ptnt_id = $(this).find(".ptntId").html();
	$.ajax({

		url: "saveOpinion",
		type: "post",
		data: ({
			"PTNT_ID": ptnt_id
		}),
		success: function(res) {
			
		},
		error: function() {
			alert("testjs444");
		}

	})
}


let editContent = document.getElementById("editContent");
let writeBtn = document.getElementById("writeBtn");


