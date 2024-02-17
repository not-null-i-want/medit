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

@RestController
public class BH2_RestController {
	
	@Autowired
	private PatientsRepository repo;
	
	@PostMapping("/DrDiagnosis") // 맵핑 이름겹치면안됨
	public PatientsDTO Detail(Integer PTNT_ID, Model model) {
		
		Patients ptnt = repo.findById(PTNT_ID).get();
		
		PatientsDTO result = new PatientsDTO();
		
		result.setDoctorName(ptnt.getDoctorId().getDoctorName());
		result.setPtntAddr(ptnt.getPtntAddr());
		result.setPtntBirthdate(ptnt.getPtntBirthdate());
		result.setPtntGender(ptnt.getPtntGender());
		result.setPtntId(ptnt.getPtntId());
		result.setPtntName(ptnt.getPtntName());
		result.setPtntPhone(ptnt.getPtntPhone());
		result.setPtntType(ptnt.getPtntType());
		// 새로운 DTO를 만들어서 거기에 다시 담아서 리턴해줌
		//   ==> 위에 있는 ptnt를 리턴으로 ajax쪽으로 넘겨주면 DoctorId를 Integer가 아니라 Doctor 객체로 인지함(Doctor.java)
		
		return result;
	}
	
}