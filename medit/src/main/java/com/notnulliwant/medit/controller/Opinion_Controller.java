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
	@RequestMapping("/ShowDiagOpinion") // 진달 날짜 띄워주는 컨트롤러임 // 트러블슈팅, postmapping으로해놔서 오류가 405오류가 뜨던걸 requestmapping으로
	// 바꿔주니 해결됨!
	public Diagnosis showDiagOpinion(Integer diagSeq) {
		/*
		 * System.out.println("testshow"); System.out.println(diagSeq);
		 * System.out.println("testshow");
		 */
		Diagnosis docOpinion = Diagrepo.findAllBydiagSeq(diagSeq);
		System.out.println(docOpinion);
		return docOpinion;
	}

}
