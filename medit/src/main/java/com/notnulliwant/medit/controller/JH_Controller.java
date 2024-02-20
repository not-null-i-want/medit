package com.notnulliwant.medit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.notnulliwant.medit.entity.Patients;
import com.notnulliwant.medit.repository.DoctorsRepository;
import com.notnulliwant.medit.repository.PatientsRepository;

@Controller
public class JH_Controller {
   
   @Autowired
   private PatientsRepository repo;
  
   
   @RequestMapping("/JH")
    public String showPatientList(Model model) {
        List<Patients> patientsList = repo.findAll();
        
        model.addAttribute("patientsList", patientsList);
        
        return "JH";
    }

}