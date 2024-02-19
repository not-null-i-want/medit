package com.notnulliwant.medit.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.notnulliwant.medit.entity.Doctors;
import com.notnulliwant.medit.repository.DoctorsRepository;
import com.notnulliwant.medit.repository.PatientsRepository;

@Controller
public class LoginController {

	@Autowired
	private DoctorsRepository repo;
	
	@Autowired
	private PatientsRepository ptntRepo;
	   
	@PostMapping("/login")
	public String login(Doctors doctor, HttpSession session) {
	      
		Doctors result = repo.findByDoctorIdAndDoctorPw(doctor.getDoctorId(), doctor.getDoctorPw());
		
	    if(result != null) {
	    	session.setAttribute("user", result);
	        return "Main";
	    } else {
	        return "Login";
	    }       
	}
	
	@GetMapping("/")
	public String start() {
		return "Login";
	}
	
	
}
