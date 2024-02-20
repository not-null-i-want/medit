let diagDetail = $("#diagnosisDate");

$(document).on('click', '.selectPtnt', function() {

	let seletedPtntId = $(this)[0].cells[0].innerText;
	
	
	$(this).addClass("PtntDiagAt");
	$(this).siblings().removeClass("PtntDiagAt");
	
	$.ajax({
		url: "ShowPatientAt",
		data: { "ptntId": seletedPtntId },
		success: function(res) {

			let Arr_ptntAt = [];

			for (let i = 0; i < res.length; i++) {
				// 날짜 포맷 변경
				/*let originalDate = new Date(res[i].diagAt);
				let formattedDate = `${originalDate.getFullYear()}-${(originalDate.getMonth() + 1).toString().padStart(2, '0')}-${originalDate.getDate().toString().padStart(2, '0')} ${originalDate.getHours().toString().padStart(2, '0')}:${originalDate.getMinutes().toString().padStart(2, '0')}`;
*/

				let originalDate = res[i].diagAt
				let formattedDate = originalDate.substring(0, 16).replace('T', ' ');
				formattedDate = formattedDate.replace(/:/, '시 ') + '분';
				Arr_ptntAt.push(formattedDate);
			}

			// 테이블 생성
			let tableHtml = '<table class="diagAtTable">';

			for (let i = 0; i < res.length; i++) {
				tableHtml += `
					<tr>
						<td>${Arr_ptntAt[i]}</td>
					</tr>`;
			}

			tableHtml += '</table>';

			diagDetail.html(tableHtml).trigger("create");


		}
	});
});