let ptntDetail = $("#ptntDetail");

$(document).on('click', '.selectPtnt', function() {
	
	let seletedPtntId = $(this)[0].cells[0].innerText;
	
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
			
			ptntDetail.html(`
				<table>
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