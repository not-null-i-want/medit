/*$(".test5").on("click", selectPtnt);

function selectPtnt() {
    let ptnt_id = $(this).find(".ptntId").html();	

	$.ajax({
		
		url: "DrDiagnosis",
		type: "post",
		data : ({
			"PTNT_ID" : ptnt_id  // 여기 PTNT_ID가 BH2_RestController.java로 보내주는거임, DrDiagnosis
		}),
		success : function(res){
			$('#output-doctorName').text(res.doctorName);
			$('#output-ptntAddr').text(res.ptntAddr);
			$('#output-ptntBirthdate').text(res.ptntBirthdate);
			$('#output-ptntGender').text(res.ptntGender);
			$('#output-ptntId').text(res.ptntId);
			$('#output-ptntName').text(res.ptntName);
			$('#output-ptntPhone').text(res.ptntPhone);
			$('#output-ptntType').text(res.ptntType);
			$('#output-diagAt').text(res.diagAt);
			
			console.log(res)
		},
		error : function(){
			alert("test");
		}
		
	})
}
*/


