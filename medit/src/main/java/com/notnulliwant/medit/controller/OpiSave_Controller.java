package com.notnulliwant.medit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.notnulliwant.medit.entity.Diagnosis;
import com.notnulliwant.medit.repository.DiagnosisRepository;

@Controller
public class OpiSave_Controller {

	@Autowired
	private DiagnosisRepository Diagrepo;

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