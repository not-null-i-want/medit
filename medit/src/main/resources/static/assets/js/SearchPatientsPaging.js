let searchBtn = document.getElementById("search_icon");
let inputText;


/////////////////// 환자 검색 페이징 /////////////////////////

let searchPatients = () => {
	
	inputText = document.getElementById("searchText").value;
	
	$.ajax({
		
		url : "/searchPaging",
		data : {"ptntName": inputText},
		success : function(res){
			console.log(res);
			
			isFirst = res.first;
			isLast = res.last;
			pageNumber = res.number;
			totalPage = res.totalPage;
			
			startPage = res.startPage;
			endPage = res.endPage;
			
			let patients = res.patients;
			
			pageNumberSpace.html("").trigger("create");
			
			table.html(`
				<tr>
					<td>No.</td>
					<td>환자명</td>
					<td>담당의</td>
				</tr>
			`).trigger("create");
			
			patients.forEach(function(ptnt){
				
				table.append(`
					<tr class="selectPtnt">
                        <td>${ptnt.ptntId}</td>
                        <td>${ptnt.ptntName}</td>
                        <td>${ptnt.doctorId.doctorName}</td>
                    </tr>
				`).trigger("create");
			});
			
				for(let i = startPage; i <= endPage; i++){
					if(i == pageNumber + 1){
						pageNumberSpace.append(`
							<b><span class="num">${i}</span></b>
						`).trigger("create");
					} else {
					pageNumberSpace.append(`
						<span class="searchPageNumber num">${i}</span>
						`).trigger("create");
					}
				}
			}
			
	});
	
}
searchBtn.addEventListener("click", searchPatients);
//////////////////////////////////////////////////////////////////

$(document).on('click', '.searchPageNumber', function() {
    let selectPageNum = $(this).text(); // 

	$.ajax({
			url : "/searchPaging",
			data : {
				"page" : selectPageNum,
				"ptntName" : inputText
			},
			success : function(res){
				console.log(res);
				
				isFirst = res.first;
				isLast = res.last;
				pageNumber = res.number;
				
				startPage = res.startPage;
				endPage = res.endPage;
			
				let patients = res.patients;
				
				pageNumberSpace.html("").trigger("create");
				
				table.html(`
				<tr>
					<td>No.</td>
					<td>환자명</td>
					<td>담당의</td>
				</tr>
				`).trigger("create");
					
				patients.forEach(function(ptnt){
						
					table.append(`
						<tr class="selectPtnt">
		                    <td>${ptnt.ptntId}</td>
		                    <td>${ptnt.ptntName}</td>
		                    <td>${ptnt.doctorId.doctorName}</td>
		                </tr>
					`).trigger("create");
				});	
				
				for(let i = startPage; i <= endPage; i++){
					if(i == pageNumber + 1){
						pageNumberSpace.append(`
							<b><span class="num">${i}</span></b>
						`).trigger("create");
					} else {
					pageNumberSpace.append(`
						<span class="searchPageNumber num">${i}</span>
						`).trigger("create");
					}
				}
					
			},
			error : function(){
				console.log("paging error");
			}})
});