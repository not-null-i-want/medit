let ptntDetail = $("#ptntDetail");

let selectedPtntId_addDiagnosis; // AddDiagnosis.js에서 쓸 변수
let selectedPtntId_doctorId; // 상동

$(document).on('click', '.selectPtnt', function() {
   
    let seletedPtntId = $(this)[0].cells[0].innerText;
	selectedPtntId_addDiagnosis = $(this)[0].cells[0].innerText;
	
	// 요소 선택시 해당 요소에 클래스 추가, 다른 형제 요소들 클래스 삭제 == 배경색 변경
	$(this).addClass("selectPtntActive");
	$(this).siblings().removeClass("selectPtntActive");
   
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
		 selectedPtntId_doctorId = res.doctorId.doctorId;
         
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
                  <td>${ptntGender}</td>
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
});