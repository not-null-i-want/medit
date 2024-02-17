package com.notnulliwant.medit.controller;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import com.notnulliwant.medit.entity.Diagnosis;
import com.notnulliwant.medit.entity.Patients;
import com.notnulliwant.medit.repository.DiagnosisRepository;
import com.notnulliwant.medit.repository.PatientsRepository;

import org.springframework.web.bind.annotation.RequestParam;

//import com.smhrd.entity.Board;
//import com.smhrd.repository.BoardRepository;

@Controller
public class BH2_Controller {

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
//		  String doctor_opinion= DOCTOR_OPINION;
		  
		  System.out.println(DOCTOR_OPINION.getDoctorOpinion());
		  
//		  DOCTOR_OPINION.setDoctorOpinion(doctor_opinion); 
		  
//		  repo.save(DOCTOR_OPINION);
		  
		  return "BH2"; }
		
	
	}
}
