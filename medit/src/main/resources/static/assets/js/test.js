$(".test").on("click", selectPtnt);

function selectPtnt() {
    let ptnt_id = $(this).find(".ptntId").html();	

	$.ajax({
		
		url: "PtntDetail",
		type: "post",
		data : ({
			"PTNT_ID" : ptnt_id
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
			console.log(res)
		},
		error : function(){
			alert("test");
		}
		
	})
}

