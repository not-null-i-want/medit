$(document).on("click", ".diagDate", function(){
	
	seletedDiagSeq = $(this)[0].firstElementChild.innerText;
	
	$.ajax({
		url: "showDiagDetail",
		data: {"diagSeq" : seletedDiagSeq},
		success: function(res){
			CxrPath = res;
			
			$("#main-section").append(`
				<img src="${CxrPath}" width="700px" height="700px">
			`)
		},
		error: function(){
			console.log("showDiagDetail.js error");
		}
	});
});