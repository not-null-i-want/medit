$(".diagnosis").on("click", selectPtnt);

function selectPtnt() {
    let ptnt_id = $(this).find(".ptntId").html();	

    $.ajax({
		
		url: "DoctorOpinions",
		type: "post",
		data : ({
			"PTNT_ID" : ptnt_id
		}),
		success : function(res){
			console.log(res);
		},
		error : function(){
			alert("testdiagnosis");
		}
		
	});
}

/*function openEditForm() {
    var currentContent = document.getElementById("content").value;
    document.getElementById("editContent").value = currentContent;
    document.querySelector(".edit-form").style.display = "block";
}

function submitEdit() {
    var editedContent = document.getElementById("editContent").value;
    document.getElementById("content").value = editedContent;
    document.querySelector(".edit-form").style.display = "none";
}

function submitDiagnosis() {
    var content = document.getElementById("content").value;
    var patientNumber = 1; // 예시로 고정된 환자 번호
    // AJAX를 사용하여 서버에 소견서 등록 요청
    // ...
}*/