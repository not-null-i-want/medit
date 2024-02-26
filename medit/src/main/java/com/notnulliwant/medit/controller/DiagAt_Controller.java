package com.notnulliwant.medit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.notnulliwant.medit.entity.Diagnosis;
import com.notnulliwant.medit.entity.Doctors;
import com.notnulliwant.medit.repository.DiagnosisRepository;

@Controller
public class DiagAt_Controller {

	@Autowired
	private DiagnosisRepository Diagrepo;

	@ResponseBody
	@RequestMapping("/ShowPatientAt") // 진달 날짜 띄워주는 컨트롤러임 // 트러블슈팅, postmapping으로해놔서 오류가 405오류가 뜨던걸 requestmapping으로 바꿔주니 해결됨!
	public List<Diagnosis> ShowPatientAt(Integer ptntId) {

		System.out.println(ptntId.getClass());

		List<Diagnosis> diag = Diagrepo.findAllByPtntId(ptntId);

		return diag;
		
	}

}