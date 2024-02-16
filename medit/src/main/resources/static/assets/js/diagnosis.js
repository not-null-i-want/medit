function loadPatientInfo(patientNumber) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8089/medit/getDiagnosisByPtntId",
        data: { ptntId: patientNumber },
        success: function (response) {
            document.getElementById("content").value = response.doctorOpinion;
        },
        error: function (error) {
            console.error("데이터 가져오기 오류:", error);
        }
    });
}

function openEditForm() {
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
}