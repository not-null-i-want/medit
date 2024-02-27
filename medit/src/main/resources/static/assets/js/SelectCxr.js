document.getElementById("CxrBtn").addEventListener("click", function() {

	let mainSection = $("#main-section");
	mainSection.html("");
	
	
	let CxrDiv = $("#selectCxr");
	let cxrName = ["정상", "무기폐", "심장비대", "흉수", "침윤음영", "폐 종괴", "폐 결절", "폐렴", "기흉", "폐 경화", "폐 부종", "폐 기종", "폐 섬유증", "흉막비후", "폐 탈장"];
	let pageSize = 4;
	let totalPage = Math.ceil(cxrName.length / pageSize);
	let currentPage = 0;

	function showPage(page) {
		CxrDiv.empty();

		let tableHtml = '<table class="cxrTable"><tr>';
		tableHtml += `<td id=proCxrName>비교군</td>`
		for (let i = page * pageSize; i < (page + 1) * pageSize && i < cxrName.length; i++) {
			if (i === page * pageSize) { // 첫 번째 항목인 경우
			}
			tableHtml += `
                <td id="cxr">
                    <img src="assets/imgs/photo_${i}.jpg" id="cxr" class="clickable-image">
                </td>`;
			if (i === (page + 1) * pageSize - 1 || i === cxrName.length - 1) { // 마지막 항목인 경우
				tableHtml += `<td rowspan=2 id=next>
						<img src="assets/imgs/nextBtn.svg" id="nextBtn" ${page === totalPage - 1 ? 'disabled' : ''}>
					</td>`;
			}

		}
		tableHtml += '</tr><tr>';
		tableHtml += `<td id="pre">
					   	 <img src="assets/imgs/preBtn.svg" id="prevBtn" ${page === 0 ? 'disabled' : ''}>
					   </td>`;
		for (let i = page * pageSize; i < (page + 1) * pageSize && i < cxrName.length; i++) {
			tableHtml += `
                <td id="cxrName">
                    ${cxrName[i]}
                </td>`;
		}
		tableHtml += '</tr></table>';

		mainSection.html(tableHtml).trigger("create");

		// 이전버튼 클릭시 
		$('#prevBtn').click(function() {
			if (currentPage > 0) {
				currentPage--;
				showPage(currentPage);
			}
		});
		// 다음버튼 클릭시
		$('#nextBtn').click(function() {
			if (currentPage < totalPage - 1) {
				currentPage++;
				showPage(currentPage);
			}
		});
		
	
// 선택한 이미지 클릭시
$('.clickable-image').click(function() {
    $('#viewCxr').attr('src', $(this).attr('src'));
    
    // 이미지 인덱스를 가져옴
    let imgIndex = $(this).attr('src').split('_')[1].split('.')[0];
    
    // 이미지 이름을 가져옴
    let imgName = cxrName[imgIndex];


    // divHtml에 이미지 정보를 담습니다.
    let divHtml = `
        <div class="selected-image-info">
            <img src="${$(this).attr('src')}" id="selectedImage">
        </div>
    `;
/* <h2>선택한 이미지 정보</h2>
 <p>이미지 번호: ${imgIndex}</p>
 <p>이미지 이름: ${imgName}</p>           
*/

    // mainSection에 divHtml 내용을 넣고, 페이지를 갱신합니다.
    mainSection.append(divHtml).trigger("create");
});

	}
	showPage(currentPage);  // 초기 페이지 로딩
});



 



