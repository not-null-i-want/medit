package com.notnulliwant.medit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.notnulliwant.medit.entity.Patients;
import com.notnulliwant.medit.repository.PatientsRepository;

@Controller
public class TestController {

	@Autowired
	private PatientsRepository repo;
	
	@RequestMapping("/test")
	public String test() {
		
		List<Patients> patients = repo.findAll();
		
		for(Patients n : patients) {
			System.out.println(n.getDoctorId().getDoctorId());
		}
		
		return "Test";
	}
	
}
