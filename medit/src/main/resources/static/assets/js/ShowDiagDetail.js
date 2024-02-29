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
					
					// 클릭한 비교군 cxr이미지 다음 형제 div 이벤트
					$(".clickPro").removeClass("clickPro");
					$(this).parent().next().addClass("clickPro");
					
					if($("#thisCxr").hasClass("thisCxrSelect")){
						$("#thisCxr").removeClass("thisCxrSelect");
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
					<canvas id="chart" width="405" height="650"></canvas>
                </div>
                <div id="originalCxr">
                    <div>
						<img src="${res}" id="originalCxrBottom"/>
                    </div>
                    <div id="thisCxr" class="thisCxrSelect">
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
			
			// 현재 환자 cxr 누를 시 이벤트
			$("#originalCxrBottom").on("click", function(){
				clearCanvas();
				$("#cxrImg").attr("src", res);
				$("#thisCxr").addClass("thisCxrSelect");
				$(".clickPro").removeClass("clickPro");
			})
			
			// 메인 섹션 이벤트
			if(!$("#main-section").hasClass("main-section-event-1") && !$("#main-section").hasClass("main-section-event-2")){
				$("#main-section").addClass("main-section-event-1");
			} else if($("#main-section").hasClass("main-section-event-1")){
				$("#main-section").removeClass("main-section-event-1");
				$("#main-section").addClass("main-section-event-2");
			} else if($("#main-section").hasClass("main-section-event-2")) {
				$("#main-section").removeClass("main-section-event-2");
				$("#main-section").addClass("main-section-event-1");
			}
			
			// 그래프 출력
			let Ct = $("#chart");
			let diagData = [10 ,6 ,22.40 ,0.60 ,0.20,
			              	10.80, 22.00, 12.00, 5.50, 11.70,
			              	14.30, 5.60, 2.50, 11.40
			             	];
			
			let topThreeIndices = diagData.map((value, index) => ({ value, index }))
				                          .sort((a, b) => b.value - a.value)
				                          .slice(0, 3)
				                          .map(({ index }) => index);

			let topThreeColors = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'];

			let colors = diagData.map((value, index) => {
			    if (topThreeIndices.includes(index)) {
			        return topThreeColors[topThreeIndices.indexOf(index)];
			    } else {
			        return 'rgba(75, 192, 192, 0.2)';
			    }
			});
			
			let myChart = new Chart(Ct, {
				type: "bar",
				data: {
			    	labels: ["무기폐", "심장비대", "흉수", "침윤음영", "폐 종괴",
							 "폐 결절", "폐렴", "기흉", "폐 경화", "폐 부종",
							 "폐 기종", "폐 섬유증", "흉막비후", "폐 탈장"
							],
			    	datasets: [
			    		{
			    			label: "질환",
			    			data: diagData,
							backgroundColor: colors,
			    		}
					],
			 	},
			  	options: {
			        indexAxis: "y",
					layout: {
			            padding: {
			                left: 10,
			                right: 30,
			                top: 20,
			                bottom: 10
			            },
					},
			        plugins: {
			            legend: {
							display: false,
			                labels: {
			                    color: "white",
								font: {
									size: 15,
									family: "SUITE-Regular"
								}
			                }
			            },
						tooltip: {
			                backgroundColor: 'rgba(68, 68, 68, 0.8)'
			            }
			        },
					animation: {
            			duration: 2000,
						easing: 'easeInOutQuad'
        			},
			        scales: {
			            x: {
			                ticks: {
								callback: function(value, index, values) {
				                    return value + '%';
				                },
			                    color: "white",
								font: {
									size: 13,
									family: "SUITE-Regular"
								}
			                },
							grid: {
			                    color: "rgba(255, 255, 255, 0.07)"
			                }
			            },
			            y: {
							grid: {
                    			display: false
							},
			                ticks: {
			                    color: "white",
								font: {
									size: 17,
									family: "SUITE-Regular"
								}
			                }
			            }
			        },
					elements: {
			            bar: {
			                borderRadius: 4,
			            }
			        },
			    }
			});
			
			
			/* 진단 결과 출력  */
			$("#diagnosisResult").html(`
				<div id="diagResult">
					<div id="diagHead">
						<img src="assets/imgs/analytic.png"/>
						<div id="diagHeadText">
							진단 결과
						</div>
					</div>
					<div id="diagBody">
						<div id="diagBodyText">
							<p class="typing-txt">일반적으로 임계치가 45% 이상이면 해당 질병일 가능성이 있습니다. 현 CXR을 분석한 결과 정상이라고 판단됩니다.</p>
							<p class="typing"></p>
						</div>
					</div>
				</div>
			`).trigger("create");
			
			/* 진단 결과 애니메이션 */
			var typingBool = false; 
			var typingIdx=0; 
			
			var typingTxt = $(".typing-txt").text(); 
			
			typingTxt=typingTxt.split(""); // 한글자씩 자름 
			
			if(typingBool==false){ 
			  // 타이핑이 진행되지 않았다면 
			   typingBool=true;     
			   var tyInt = setInterval(typing,100); // 반복동작 
			} 
			     
			function typing(){ 
			  if(typingIdx<typingTxt.length){ 
			    // 타이핑될 텍스트 길이만큼 반복
			    $(".typing").append(typingTxt[typingIdx]);
			    // 한글자씩 이어줌 
			    typingIdx++; 
			   } else{ 
			    //끝나면 반복종료 
			    clearInterval(tyInt); 
			   } 
			}  
			
			
			if(!$("#diagResult").hasClass("diagResult-event-1") && !$("#diagResult").hasClass("diagResult-event-2")){
				$("#diagResult").addClass("diagResult-event-1");
			} else if ($("#diagResult").hasClass("diagResult-event-1")){
				$("#diagResult").removeClass("diagResult-event-1");
				$("#diagResult").addClass("diagResult-event-2");
			} else {
				$("#diagResult").removeClass("diagResult-event-2");
				$("#diagResult").addClass("diagResult-event-1");
			}
			
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