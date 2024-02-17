package com.notnulliwant.medit.controller;

import java.awt.print.Pageable;
import java.util.List;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.notnulliwant.medit.entity.Doctors;
import com.notnulliwant.medit.entity.Patients;
import com.notnulliwant.medit.repository.DoctorsRepository;
import com.notnulliwant.medit.repository.PatientsRepository;

@Controller
public class LoginController {

	@Autowired
	private DoctorsRepository repo;
	
	@Autowired
	private PatientsRepository ptntRepo;
	   
	@PostMapping("/login")
	public String login(Doctors doctor, HttpSession session, Model model) {
	      
		Doctors result = repo.findByDoctorIdAndDoctorPw(doctor.getDoctorId(), doctor.getDoctorPw());
		
		List<Patients> ptntList = ptntRepo.findAll();
		
	    if(result != null) {
	    	model.addAttribute("ptntList", ptntList);
	    	session.setAttribute("user", result);
	        return "redirect:paging";
	    } else {
	        return "Login";
	    }       
	}
	
	@GetMapping("/")
	public String start() {
		return "Login";
	}
	
	
}
