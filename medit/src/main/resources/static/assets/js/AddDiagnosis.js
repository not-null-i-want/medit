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
					<label for="ptntName-diag">환자명</label> 
					<input type="text" value="${selectedPtntName_addDiagnosis}" class="fixedTextBox" id="ptntName-diag" disabled>
				</div>
				<div class="writeDiagnosis_doctorName">
					<label for="doctorName-diag">담당의</label>
					<input type="text" value="${selectedDoctorName_addDiagnosis}" class="fixedTextBox" id="doctorName-diag" disabled>
				</div>
				<div>
					<input type="file" name="file" required>
					<input type="hidden" value="${selectedPtntId_addDiagnosis}" name="ptntId">
					<input type="hidden" value="${selectedDoctorId_addDiagnosis}" name="doctorId"> 
				</div>
				<div>
					<input type="submit" value="진단">
				</div>
			</form>
		</div>
	`).trigger("create");
};
writeDiagBtn.addEventListener("click", loadWriteDiag);