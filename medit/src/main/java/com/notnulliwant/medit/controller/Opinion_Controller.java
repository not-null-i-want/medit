package com.notnulliwant.medit.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.notnulliwant.medit.entity.Diagnosis;
import com.notnulliwant.medit.entity.Patients;
import com.notnulliwant.medit.repository.DiagnosisRepository;
import com.notnulliwant.medit.repository.PatientsRepository;

@Controller
public class Opinion_Controller {

	@Autowired
	private DiagnosisRepository Diagrepo;

	@ResponseBody
	@RequestMapping("/ShowDiagOpinion") // 의사소견 띄워주는 컨트롤러
	public Diagnosis showDiagOpinion(Integer diagSeq) {

		Diagnosis docOpinion = Diagrepo.findAllBydiagSeq(diagSeq);
		System.out.println(docOpinion);
		return docOpinion;

	}

	@ResponseBody
	@RequestMapping("/saveOpinion") // 의사소견 저장해주는 컨트롤러
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
