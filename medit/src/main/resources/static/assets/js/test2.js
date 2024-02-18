let isFirst;
let isLast;
let pageNumber;
let totalPage;
let startPage;
let endPage;
let pageDiv;

let table = document.getElementById("ptntTable");
let nextBtn = document.getElementById("next");
let preBtn = document.getElementById("pre");
let firtsBtn = document.getElementById("first");
let lastBtn = document.getElementById("last");
let pageNumberSpace = document.getElementById("pageNumber");

//////////////////// 첫 진입시 페이지 로딩 ///////////////
$(document).ready(function() {
	
	$.ajax({
		url: "/paging",
		contentType: "application/json;charset=UTF-8",
		// dataType: "json",
		success: function(res){
			
			console.log(res);
			
			isFirst = res.first;
			isLast = res.last;
			pageNumber = res.number;
			totalPage = res.totalPage;
			
			startPage = 1;
			endPage = res.totalPage - 1;
		
			let patients = res.patients;
			
			patients.forEach(function(ptnt){
				
				table.innerHTML += `
					<tr>
                        <td>${ptnt.ptntId}</td>
                        <td>${ptnt.ptntName}</td>
                        <td>${ptnt.doctorId.doctorName}</td>
                    </tr>
				`;
			});
			
			for(let i = startPage; i <= endPage; i++){
				if(i == pageNumber + 1){
					pageNumberSpace.innerHTML += `
						<span>${i}</span>
					`
				} else {
					pageNumberSpace.innerHTML += `
						<a href="#"><span>${i}</span></a>
					`
				}
			}
			
			pageDiv = totalPage / 5;	
				
		},
		error: function(){
			console.log("error")
		}
	});

	
});
///////////////////////////////////////////////////////////

//////////////////// 다음 페이지 로딩 /////////////////////
let next = () => {
	
	if(!isLast){
		$.ajax({
		url : "/paging",
		data : {"page" : pageNumber + 2},
		success : function(res){
			console.log(res);
			
			isFirst = res.first;
			isLast = res.last;
			pageNumber = res.number;
		
			let patients = res.patients;
			
			table.innerHTML = "";
			
			patients.forEach(function(ptnt){
				
				table.innerHTML += `
					<tr>
                        <td>${ptnt.ptntId}</td>
                        <td>${ptnt.ptntName}</td>
                        <td>${ptnt.doctorId.doctorName}</td>
                    </tr>
				`;
			});
			
			pageNumberSpace.innerHTML = "";
			for(let i = startPage; i <= endPage; i++){
				if(i == pageNumber + 1){
					pageNumberSpace.innerHTML += `
						<span>${i}</span>
					`
				} else {
					pageNumberSpace.innerHTML += `
						<a href="#"><span>${i}</span></a>
					`
				}
			}	
					
		},
		error : function(){
			console.log("paging error");
		}})
	}
}
nextBtn.addEventListener("click", next);
///////////////////////////////////////////////////////////

//////////////////// 이전 페이지 로딩 /////////////////////
let pre = () => {
	
	if(!isFirst){
		$.ajax({
		url : "/paging",
		data : {"page" : pageNumber},
		success : function(res){
			console.log(res);
			
			isFirst = res.first;
			isLast = res.last;
			pageNumber = res.number;
		
			let patients = res.patients;
			
				table.innerHTML = "";
				
				patients.forEach(function(ptnt){
					
					table.innerHTML += `
						<tr>
	                        <td>${ptnt.ptntId}</td>
	                        <td>${ptnt.ptntName}</td>
	                        <td>${ptnt.doctorId.doctorName}</td>
	                    </tr>
					`;
				});		
		},
		error : function(){
			console.log("paging error");
		}})
	}
}
	
preBtn.addEventListener("click", pre);
///////////////////////////////////////////////////////////

//////////////////// 맨 앞 페이지 로딩 /////////////////////
let first = () => {
	
	if(!isFirst){
		
		$.ajax({
		url : "/paging",
		data : {"page" : 1},
		success : function(res){
			console.log(res);
			
			isFirst = res.first;
			isLast = res.last;
			pageNumber = res.number;
		
			let patients = res.patients;
			
				table.innerHTML = "";
				
				patients.forEach(function(ptnt){
					
					table.innerHTML += `
						<tr>
	                        <td>${ptnt.ptntId}</td>
	                        <td>${ptnt.ptntName}</td>
	                        <td>${ptnt.doctorId.doctorName}</td>
	                    </tr>
					`;
				});		
		},
		error : function(){
			console.log("paging error");
		}})
	}
}
	
firtsBtn.addEventListener("click", first);
///////////////////////////////////////////////////////////

//////////////////// 맨 끝 페이지 로딩 /////////////////////
let last = () => {
	
	if(!isLast){
		
		$.ajax({
		url : "/paging",
		data : {"page" : totalPage},
		success : function(res){
			console.log(res);
			
			isFirst = res.first;
			isLast = res.last;
			pageNumber = endPage;
		
			let patients = res.patients;
			
				table.innerHTML = "";
				
				patients.forEach(function(ptnt){
					
					table.innerHTML += `
						<tr>
	                        <td>${ptnt.ptntId}</td>
	                        <td>${ptnt.ptntName}</td>
	                        <td>${ptnt.doctorId.doctorName}</td>
	                    </tr>
					`;
				});		
		},
		error : function(){
			console.log("paging error");
		}})
	}
}
lastBtn.addEventListener("click", last);
///////////////////////////////////////////////////////////