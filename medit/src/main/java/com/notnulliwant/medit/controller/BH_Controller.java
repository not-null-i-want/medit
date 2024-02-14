package com.notnulliwant.medit.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.notnulliwant.medit.entity.Patients;
import com.notnulliwant.medit.entity.Chattings;
import com.notnulliwant.medit.repository.ChattingsRepository;
import com.notnulliwant.medit.repository.PatientsRepository;

@Controller
public class BH_Controller {

	@Autowired
	private PatientsRepository repo;
	
	@RequestMapping("/BH")
	public String BH() {
		
		return "BH";
	}
	
	@RequestMapping("/savePatient")
	public String join( Patients patients, String addr1, String addr2, String addr3 ) {
		
		System.out.println("test test");
		String ptnt_addr= addr1+" "+addr2+" 우편번호("+addr3+")";
		patients.setPtntAddr(ptnt_addr);
		repo.save(patients);
		
		return "BH";
	}
	
}
