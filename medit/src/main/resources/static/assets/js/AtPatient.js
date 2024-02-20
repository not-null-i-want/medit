let diagDetail = $("#diagnosisDate");

$(document).on('click', '.selectPtnt', function() {

	let seletedPtntId = $(this)[0].cells[0].innerText;
	$.ajax({
		url: "ShowPatientAt",
		data: { "ptntId": seletedPtntId },
		success: function(res) {

			let Arr_ptntAt = [];

			for (let i = 0; i < res.length; i++) {
				
				let originalDate = res[i].diagAt
				let formattedDate = originalDate.substring(0, 16).replace('T', ' ');
				formattedDate = formattedDate.replace(/:/, '시 ') + '분';
				Arr_ptntAt.push(formattedDate);
				
			}

			// 테이블 생성
			let tableHtml = '<table>';

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