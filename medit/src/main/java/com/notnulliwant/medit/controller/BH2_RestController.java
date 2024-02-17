package com.notnulliwant.medit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.notnulliwant.medit.entity.Diagnosis;
import com.notnulliwant.medit.entity.Patients;
import com.notnulliwant.medit.entity.PatientsDTO;
import com.notnulliwant.medit.repository.PatientsRepository;

import ch.qos.logback.core.recovery.ResilientSyslogOutputStream;

@Controller
public class BH2_RestController {

	@Autowired
	   private PatientsRepository repo;
	   //private DoctorsRepository doctorsrepo;
	   
	   @RequestMapping("/BH2")
	    public String showPatientList(Model model) {
	        List<Patients> patientsList = repo.findAll();
	        
	        model.addAttribute("patientsList", patientsList);
	        
	        return "BH2";
	    }

	    @GetMapping("/search1")
	    public String search(@RequestParam("keyword") String keyword, Model model) {
	       
	        List<Patients> patientsList = repo.findByPtntNameContaining(keyword);
	        
	        model.addAttribute("patientsList", patientsList);
	        
	        return "BH2"; 
	    }
	
	
	  @RequestMapping("/saveOpinion")
	  public String opinion( Diagnosis DOCTOR_OPINION) {
	  
	  System.out.println("test test"); 
//	  String doctor_opinion= DOCTOR_OPINION;
	  
	  System.out.println(DOCTOR_OPINION.getDoctorOpinion());
	  
//	  DOCTOR_OPINION.setDoctorOpinion(doctor_opinion); 
	  
//	  repo.save(DOCTOR_OPINION);
	  
	  return "BH2"; }
	
	
	
	
	
}
