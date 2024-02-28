$(document).on("click", ".diagDate", function() {

	seletedDiagSeq = $(this)[0].firstElementChild.innerText;


	$.ajax({
		url: "showDiagDetail",
		data: { "diagSeq": seletedDiagSeq },
		success: function(res) {

			let cxrName = ["정상", "무기폐", "심장비대", "흉수", "침윤음영", "폐 종괴", "폐 결절", "폐렴", "기흉", "폐 경화", "폐 부종", "폐 기종", "폐 섬유증", "흉막비후", "폐 탈장"];
			let pageSize = 5;  // 페이지당 이미지 수를 5로 변경
			let totalPage = Math.ceil(cxrName.length / pageSize);
			let currentPage = 0;

			function showPage(page) {
				let tableHtml = `<div id="compareCxr">
	                                    	<div id="compareTable">
	                                        	비교군
	                                    	</div>                                      
	                               			<img src="assets/imgs/preBtn.svg" id="prevBtn" ${page === 0 ? 'disabled' : ''}>																																             						                                                           	
	                                  </div>`;

				for (let i = page * pageSize; i < (page + 1) * pageSize && i < cxrName.length; i++) {
					tableHtml += `
	                    <div id="compareCxr${i}">
	                        <div>
	                            <img src="assets/imgs/photo_${i}.jpg" id="conpareCxrBottom">
	                        </div>
	                        <div>
	                            <span>
	                                ${cxrName[i]}
	                            </span>
	                        </div>	
	                    </div>`;
				}

				tableHtml += `<div id="nextBtnCxr">
										<img src="assets/imgs/nextBtn.svg" id="nextBtn" ${page === totalPage - 1 ? 'disabled' : ''}>
								  </div>`;

				$("#proCxr").html(tableHtml).trigger("create");

				$('#prevBtn').click(function() {
					if (currentPage > 0) {
						currentPage--;
						showPage(currentPage);
					}
				});
				$('#nextBtn').click(function() {
					if (currentPage < totalPage - 1) {
						currentPage++;
						showPage(currentPage);
					}
				});
				
				
				// 이미지 클릭 이벤트 처리
				$(`#proCxr img[id^='conpareCxrBottom']`).click(function() {
					let imgSrc = $(this).attr('src');
					let imgHtml = `<img src="${imgSrc}" id="selectedImage">`;
					
					$("#cxrImg").remove();		
					
					
					if ($("#selectedImage").length === 0) {
						$("#main-section").append(imgHtml);
						}else{
						$("#selectedImage").remove();
       					$("#main-section").append(imgHtml);
    				}
						
						

				});
				
			}

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


			showPage(currentPage);
		},
		error: function() {
			console.log("showDiagDetail.js error");
		}
	});

});




