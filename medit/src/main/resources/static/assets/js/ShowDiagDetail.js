$(document).on("click", ".diagDate", function(){
	
	seletedDiagSeq = $(this)[0].firstElementChild.innerText;
	
	$.ajax({
		url: "showDiagDetail",
		data: {"diagSeq" : seletedDiagSeq},
		success: function(res){
			
			$("#main-section").html(`
				<img src="${res}" id="cxrImg"/>
                <div id="graph">

                </div>
                <div id="originalCxr">
                    <div>
						<img src="${res}" id="originalCxrBottom"/>
                    </div>
                    <div>
                        <span>현재 환자 CXR</span>
                    </div>
                </div>
				<div id="proCxr">

				</div>
			`).trigger("create");
		},
		error: function(){
			console.log("showDiagDetail.js error");
		}
	});
	
});