package com.notnulliwant.medit.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.notnulliwant.medit.entity.Patients;
import com.notnulliwant.medit.entity.Chattings;
import com.notnulliwant.medit.entity.Diagnosis;
import com.notnulliwant.medit.repository.ChattingsRepository;
import com.notnulliwant.medit.repository.PatientsRepository;

import ch.qos.logback.core.recovery.ResilientSyslogOutputStream;

@Controller
public class BH_Controller {

	@Autowired
	private PatientsRepository repo;
	
	@RequestMapping("/BH")
	public String BH() {
		
		return "BH";
	}
	
	@RequestMapping("/savePatient")
	public String join( Patients patients, String addr1, String addr2, String addr3, Diagnosis DOCTOR_OPINION) {
		
		String ptnt_addr= addr1+" "+addr2+" 우편번호("+addr3+")";
		patients.setPtntAddr(ptnt_addr);
		System.out.println("test"); // 테스트용
		System.out.println(patients.getDoctorId()); // 테스트용
		repo.save(patients);
		
		return "BH";
	}
	
}
