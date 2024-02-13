package com.notnulliwant.medit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.notnulliwant.medit.entity.Patients;
import com.notnulliwant.medit.repository.DoctorsRepository;
import com.notnulliwant.medit.repository.PatientsRepository;

@Controller
public class JH_Controller {
	
	@Autowired
	private PatientsRepository repo;
	private DoctorsRepository doctorsrepo;
	
	@RequestMapping("/JH")
	public String JH( Model model ) {
		
		List<Patients> list = repo.findAll();
		
		for(Patients n : list) {
			System.out.println(n.getDoctorId().getDoctorName());
		}
		
		model.addAttribute("patiensList", list);
		
		
		
		return "JH";
	}
	
	
	
}
