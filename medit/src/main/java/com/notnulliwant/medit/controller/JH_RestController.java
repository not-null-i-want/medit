package com.notnulliwant.medit.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.annotations.JsonAdapter;
import com.notnulliwant.medit.entity.Patients;
import com.notnulliwant.medit.entity.PatientsDTO;
import com.notnulliwant.medit.repository.PatientsRepository;

@RestController
public class JH_RestController {
	
	@Autowired
	private PatientsRepository repo;
	
	@PostMapping("/PtntDetail")
	public PatientsDTO Detail(Integer PTNT_ID, Model model) {
		
		System.out.println(PTNT_ID);
		
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