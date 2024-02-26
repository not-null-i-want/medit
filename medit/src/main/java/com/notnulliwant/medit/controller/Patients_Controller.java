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
public class Patients_Controller {
   
   @Autowired
   private PatientsRepository repo;
  
   
   // 리다이렉트 할때 메인화면 불러오는 메소드
   @GetMapping("/Main")
   public String main() {
		return "Main";
   }
   
   // 환자등록을 위한 메소드
   @RequestMapping("/savePatients")
	public String join( Patients patients, String addr1, String addr2, String addr3) {
		
		String ptnt_addr= addr1+" "+addr2+" 우편번호("+addr3+")";
		
		Patients patients2 = new Patients();
		patients2.setPtntName(patients.getPtntName());
		patients2.setPtntGender(patients.getPtntGender());
		patients2.setPtntBirthdate(patients.getPtntBirthdate());
		patients2.setPtntPhone(patients.getPtntPhone());
		patients2.setDoctorId(patients.getDoctorId());
		patients2.setPtntAddr(ptnt_addr);
		
		repo.save(patients2);
		
		return "redirect:Main";
	}
   
}