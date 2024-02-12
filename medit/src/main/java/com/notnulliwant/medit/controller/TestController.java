package com.notnulliwant.medit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.notnulliwant.medit.entity.Diagnosis;
import com.notnulliwant.medit.entity.Patients;
import com.notnulliwant.medit.repository.DiagnosisRepository;

@Controller
public class TestController {

	@Autowired
	private DiagnosisRepository repo;
	
	@RequestMapping("/test")
	public String test() {
		
		List<Diagnosis> diagnosis = repo.findAll();
		
		for(Diagnosis n : diagnosis) {
			System.out.println(n);
		}
		
		return "Test";
	}
	
}
