let ptntDetail = $("#ptntDetail");

let selectedPtntId_addDiagnosis; // AddDiagnosis.js에서 쓸 변수
let selectedDoctorId_addDiagnosis; // 상동
let selectedPtntName_addDiagnosis;
let selectedDoctorName_addDiagnosis;

$(document).on('click', '.selectPtnt', function() {
   
    let seletedPtntId = $(this)[0].cells[0].innerText;
	selectedPtntId_addDiagnosis = $(this)[0].cells[0].innerText;
	
	// 요소 선택시 해당 요소에 클래스 추가, 다른 형제 요소들 클래스 삭제 == 배경색 변경
	$(this).addClass("selectPtntActive");
	$(this).siblings().removeClass("selectPtntActive");
	
	// 환자 클릭시 환자 디테일 박스 투명도 애니메이션
	if($("#ptntDetail").hasClass("ptntDetailBoxAnim-1") === true){
		$("#ptntDetail").removeClass("ptntDetailBoxAnim-1");
		$("#ptntDetail").addClass("ptntDetailBoxAnim-2");
	} else {
		$("#ptntDetail").removeClass("ptntDetailBoxAnim-2");
		$("#ptntDetail").addClass("ptntDetailBoxAnim-1");
	}
   
   $.ajax({
      url : "ShowPatientDetail",
      data : {"ptntId" : seletedPtntId},
      success : function(res){
         let doctorName = res.doctorId.doctorName;
         let ptntName = res.ptntName;
         let ptntPhone = res.ptntPhone;
         let ptntId = res.ptntId;
         let ptntGender = res.ptntGender;
         let ptntBirthdate = res.ptntBirthdate;
         let ptntAddr = res.ptntAddr;
		 selectedDoctorId_addDiagnosis = res.doctorId.doctorId;
		 selectedPtntName_addDiagnosis = res.ptntName;
		 selectedDoctorName_addDiagnosis = res.doctorId.doctorName;
         
         ptntDetail.html(`
            <table class="detailTable">
                   <tr>
                      <td>환자 번호</td>
                  	  <td>${ptntId}</td>
                   </tr>
                   <tr>
                      <td>환자 이름</td>
                      <td>${ptntName}</td>
                   </tr>
                   <tr>
                      <td>생년월일</td>
                      <td>${ptntBirthdate}</td>
                   </tr>
                   <tr>
                      <td>성별</td>
					  <td>${ptntGender == "0" ? "남성" : "여성"}</td>
                   </tr>
                   <tr>
                      <td>주소</td>
                      <td>${ptntAddr}</td>
                   </tr>
                   <tr>
                      <td>연락처</td>
                      <td>${ptntPhone}</td>
                   </tr>
                   <tr>
                      <td>담당의</td>
                      <td>${doctorName}</td>
                   </tr>
                </table>
         `).trigger("create");
      }
   });

	$("#diagnosisDate").css("border", "1px solid rgb(255, 255, 255, 0.3)");

});