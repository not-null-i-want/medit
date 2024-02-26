package com.notnulliwant.medit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.notnulliwant.medit.entity.Diagnosis;
import com.notnulliwant.medit.repository.DiagnosisRepository;

@Controller
public class RestDiagnosis_Controller {

	@Autowired
	private DiagnosisRepository Diagrepo;

	@ResponseBody
	@RequestMapping("/ShowPatientAt") // 진달 날짜 띄워주는 컨트롤러임 // 트러블슈팅, postmapping으로해놔서 오류가 405오류가 뜨던걸 requestmapping으로	바꿔주니 해결됨!
	public List<Diagnosis> ShowPatientAt(Integer ptntId) {

		List<Diagnosis> diag = Diagrepo.findAllByPtntId(ptntId);

	return diag;
	
		}
	
	@ResponseBody
	@RequestMapping("/ShowDiagOpinion") // 의사소견 띄워주는 컨트롤러
	public Diagnosis showDiagOpinion(Integer diagSeq) {

		Diagnosis docOpinion = Diagrepo.findAllBydiagSeq(diagSeq);
		System.out.println(docOpinion);
		return docOpinion;

	}

	@ResponseBody
	@RequestMapping("/saveOpinion")
	public String updateOpinion(Integer saveSeq, String saveOpinion) {

		System.out.println(saveOpinion);
		System.out.println(saveSeq);

		Integer diagSeq = saveSeq;
		String doctorOpinion = saveOpinion;

		// DIAG_SEQ 값을 기준으로 DOCTOR_OPINION만 변경
		Diagrepo.updateDoctorOpinionByDiagSeq(diagSeq, doctorOpinion);

		return "";
	}
	 	
}
