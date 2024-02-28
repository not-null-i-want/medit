$(document).on("click", ".diagDate", function(){
	
	seletedDiagSeq = $(this)[0].firstElementChild.innerText;
	
	$.ajax({
		url: "showDiagDetail",
		data: {"diagSeq" : seletedDiagSeq},
		success: function(res){
			
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
					clearCanvas();
						
					if ($("#selectedImage").length === 0) {
						$("#cxrImg").attr("src", imgSrc);
						}else{
						$("#selectedImage").remove();
       					$("#cxrImg").attr("src", imgSrc);
    				}
												
				});				
			}
			

			$("#main-section").html(`
				<img src="${res}" id="cxrImg">
				<canvas id="myCanvas" width="760" height="760"></canvas>
				<div id="implement">
					<img src="assets/imgs/on_off.png" class="toggleBtn toggleDrawing-passive" onclick="toggleDrawing()"/>
					<img src="assets/imgs/width.png" id="pencilWidth">
					<input type="range" min="1" max="10" step="1" value="1" class="stroke-width-slider" onchange="setStrokeWidth(this.value)">
					<span id="strokeWidthValue" hidden>1</span>
					<img src="assets/imgs/pencil.png" class="yellow" onclick="setColor('#ffe261')">
					<img src="assets/imgs/pencil.png" class="green" onclick="setColor('#b1ff4a')">
					<img src="assets/imgs/pencil.png" class="red" onclick="setColor('#ff5555')">
					<img src="assets/imgs/clean.png" class="clear-button" onclick="clearCanvas()">
				</div>
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
			  
			var canvas = document.getElementById('myCanvas');
			var context = canvas.getContext('2d');
		
			canvas.addEventListener('mousedown', function(event) {
		        isDrawing = true;
			    var rect = canvas.getBoundingClientRect();
			    var x = event.clientX - rect.left;
			    var y = event.clientY - rect.top;
		        context.beginPath();
		    	context.moveTo(x, y);
			});
		
		    canvas.addEventListener('mousemove', function(event) {
				if (isDrawing) {
					var rect = canvas.getBoundingClientRect();
			        var x = event.clientX - rect.left;
			        var y = event.clientY - rect.top;
			        context.lineTo(x, y);
					context.strokeStyle = `rgba(${hexToRgb(currentColor)}`;
			        context.lineWidth = currentStrokeWidth;
			        context.stroke();
				}
			});
		
		    canvas.addEventListener('mouseup', function() {
				isDrawing = false;
			});
		
		    canvas.addEventListener('mouseleave', function() {
				isDrawing = false;
			});
		},
		error: function(){
			console.log("showDiagDetail.js error");
		}
	});	
});

/*** canvas 부분 ***/
var isDrawing = false;
var currentColor = '#000';
var currentStrokeWidth = 1;
var isDrawingVisible = true;

let clearCanvas = () => {
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');
 	context.clearRect(0, 0, canvas.width, canvas.height);
}

let setColor = (color) => {
	currentColor = color;
}

let setStrokeWidth = (value) => {
	currentStrokeWidth = value;
	document.getElementById('strokeWidthValue').textContent = value;
}

let hexToRgb = (hex) => {
	var bigint = parseInt(hex.substring(1), 16);
	var r = (bigint >> 16) & 255;
	var g = (bigint >> 8) & 255;
	var b = bigint & 255;
	return `${r}, ${g}, ${b}`;
}

/* canvas on/off  */
let toggleDrawing = () => {
	var canvas = document.getElementById('myCanvas');
    if(isDrawingVisible == true){
		canvas.style.display = 'none';
		isDrawingVisible = false;
	} else {
		isDrawingVisible = true;
		canvas.style.display = 'block';
	}
}

/* 색연필 클릭시 색 변경 */
$(document).on("click", ".red", function(){
	$(".green").removeClass("green-active");
	$(".yellow").removeClass("yellow-active");
	$(this).addClass("red-active");
});

$(document).on("click", ".green", function(){
	$(".red").removeClass("red-active");
	$(".yellow").removeClass("yellow-active");
	$(this).addClass("green-active");
});

$(document).on("click", ".yellow", function(){
	$(".red").removeClass("red-active");
	$(".green").removeClass("green-active");
	$(this).addClass("yellow-active");
});

/* 토글 버튼 누를시 색 변경 */
$(document).on("click", ".toggleBtn", function(){
	if($(this).hasClass("toggleDrawing-active")){
		$(this).removeClass("toggleDrawing-active");
		$(this).addClass("toggleDrawing-passive");
		console.log("test1");
	} else {
		$(this).removeClass("toggleDrawing-passive");
		$(this).addClass("toggleDrawing-active");
		console.log("test2");
	}
});