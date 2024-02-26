$(document).on("click", ".diagDate", function(){
	
	seletedDiagSeq = $(this)[0].firstElementChild.innerText;
	
	$.ajax({
		url: "showDiagDetail",
		data: {"diagSeq" : seletedDiagSeq},
		success: function(res){
			console.table(res);
		},
		error: function(){
			console.log("showDiagDetail.js error");
		}
	});
});