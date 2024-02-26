let writeDiagBtn = document.getElementById("testBtn");

// console.log(selectedPtntId_addDiagnosis); // SelectPatient.js에서 가져온 변수
// console.log(selectedDoctorId_addDiagnosis);
// selectedPtntName_addDiagnosis;
// selectedDoctorName_addDiagnosis;

let mainSection = $("#main-section");

const loadWriteDiag = () => {
	
	mainSection.html(`
		<div class="tabName">
			<div class="box">

				<div class="title">
					<span class="block"></span>
					<h1>
						Diagnose<span></span>
					</h1>
				</div>

				<div class="role">
					<div class="block"></div>
					<p>using medit</p>
				</div>

			</div>
		</div>
		<div id="writeDiagnosis">
			<form action="diagnose" method="post" enctype="multipart/form-data">
				<div class="writeDiagnosis_ptntName">
					<img src="assets/imgs/diag_patient.svg" class="diag-person diag-pt">
					<label for="ptntName-diag">환자명</label> 
					<input type="text" value="${selectedPtntName_addDiagnosis}" class="fixedTextBox" id="ptntName-diag" disabled>
					<div id="ptntName-underline">
					</div>
				</div>
				<div class="writeDiagnosis_doctorName">
					<img src="assets/imgs/diag_doctor.svg" class="diag-person diag-dc">
					<label for="doctorName-diag">담당의</label>
					<input type="text" value="${selectedDoctorName_addDiagnosis}" class="fixedTextBox" id="doctorName-diag" disabled>
					<div id="doctorName-underline">
					</div>
				</div>
				<div>
					<input type="hidden" value="${selectedPtntId_addDiagnosis}" name="ptntId">
					<input type="hidden" value="${selectedDoctorId_addDiagnosis}" name="doctorId"> 
					<div class="upload">
                        <div class="upload-files">
                            <header>
                                <p>
                                    <i class="fa fa-cloud-upload" aria-hidden="true"></i>
                                    <span class="up">CXR</span>
                                    <span class="load">Upload</span>
                                </p>
                            </header>
                            <div class="body" id="drop">
                                <i class="fa fa-file-text-o pointer-none" aria-hidden="true"></i>
                                <p class="pointer-none">파일을 <b>클릭하여 끌어넣거나</b> <br /><a href="#" id="triggerFile">이 곳을 눌러</a> 업로드를 진행하세요.</p>
                                <input type="file" name="file" class="cxrUpload"/>
                            </div>
                            <footer>
                                <div class="divider">
                                    <span><AR>FILES</AR></span>
                                </div>
                            	<div class="list-files">
                            
                            	</div>
                            	<input type="submit" value="medit!" class="importar">
                            </footer>
                        </div>
                    </div>
				</div>
			</form>
		</div>
	`).trigger("create");
	
};
writeDiagBtn.addEventListener("click", loadWriteDiag);



/* CXR 업로드 박스 */
let App = {};
App.init = (function() {
	
	$(document).on('click', '#triggerFile', evt => {
		$(".cxrUpload").click();
		
		$(".cxrUpload").change(function(evt){
			
			const files = evt.target.files; // FileList object

			let template = `${Object.keys(files)
				.map(file => `
					<div class="file file--${file}">
					    <div class="name">
							<span>${files[file].name}</span>
						</div>
					    <div class="progress active">
						</div>
					    <div class="done">
							<a href="#" target="_blank">
						      	<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000">
								<g><path id="path" d="M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490c270.6,0,490-219.4,490-490C990,229.4,770.6,10,500,10z M500,967.7C241.7,967.7,32.3,758.3,32.3,500C32.3,241.7,241.7,32.3,500,32.3c258.3,0,467.7,209.4,467.7,467.7C967.7,758.3,758.3,967.7,500,967.7z M748.4,325L448,623.1L301.6,477.9c-4.4-4.3-11.4-4.3-15.8,0c-4.4,4.3-4.4,11.3,0,15.6l151.2,150c0.5,1.3,1.4,2.6,2.5,3.7c4.4,4.3,11.4,4.3,15.8,0l308.9-306.5c4.4-4.3,4.4-11.3,0-15.6C759.8,320.7,752.7,320.7,748.4,325z"</g>
								</svg>
							</a>
					    </div>
				    </div>`).join("")}`;
							
		$("#drop").addClass("hidden");
		$("footer").addClass("hasFiles");
		$(".importar").addClass("active");
		setTimeout(() => {
			$(".list-files").html(template).trigger("create");
		}, 1000);

		Object.keys(files).forEach(file => {
			let load = 2000 + (file * 2000); // 가짜 로딩
			setTimeout(() => {
				$(".progress").removeClass("active");
				$(".done").addClass("anim");
			}, load);
		});
		
		});
	});

	/* medit! 버튼 클릭시 */
	$(document).on('click', '.importar', evt => {
		$(".list-files").html("");
		$("footer").removeClass("hasFiles");
		$(".importar").removeClass("active");
		setTimeout(() => {
			$("#drop").removeClass("hidden");
		}, 500);
	});

})();