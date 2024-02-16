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
			console.log(res);
		},
		error : function(){
			alert("test");
		}
		
	})
}

