package com.notnulliwant.medit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.notnulliwant.medit.entity.Diagnosis;
import com.notnulliwant.medit.entity.Patients;
import com.notnulliwant.medit.repository.PatientsRepository;

@Controller
public class BH_Controller {

	@Autowired
	private PatientsRepository repo;
	
	@RequestMapping("/BH")
	public String BH() {
		
		return "BH";
	}
	
	@RequestMapping("/BH1")
	public String BH2() {
		
		return "BH1";
	}
	
	@RequestMapping("/savePatient")
	public String join( Patients patients, String addr1, String addr2, String addr3) {
		
		String ptnt_addr= addr1+" "+addr2+" 우편번호("+addr3+")";
		patients.setPtntAddr(ptnt_addr);
		System.out.println("test"); // 테스트용
		System.out.println(patients.getDoctorId()); // 테스트용
		repo.save(patients);
		
		return "BH";
	}
	
	@RequestMapping("/exam1")
	public String exam() {
		return "exam";
	}
	
	
	
	@PostMapping("/loadPtnt")
	@ResponseBody
	public List<Patients> loadPtnt() {
		
		List<Patients> patients = repo.findAll();
		
		for(Patients n  : patients) {
			System.out.println(n.getPtntName());
			System.out.println(n.getDoctorId());
		}
		
		// 원래 jackson databind는 리턴해주려는 객체(여기서는 엔티티 객체) 안에 또 객체가 있으면 인식을 못해서 javascript객체로 변환을 자동으로 못해준다.
		// 그런데 initializer를 써서 잭슨 데이터바인드가 인식할 수 있게 된다.
		// ex) 이 컨트롤러에서 List<Patients> patients 안의 Patients객체 하나 하나 안에는 Doctors라는 객체를 품고 있어서 인식못함
		return patients;
	}
}
