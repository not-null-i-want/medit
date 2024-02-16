package com.notnulliwant.medit.controller;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import com.notnulliwant.medit.entity.Diagnosis;
import com.notnulliwant.medit.repository.DiagnosisRepository;
import org.springframework.web.bind.annotation.RequestParam;

//import com.smhrd.entity.Board;
//import com.smhrd.repository.BoardRepository;

@Controller
public class BH1_Controller {

    @Autowired
    private DiagnosisRepository diagnosisRepository;
	
//	@Autowired
//	private BoardRepository repo;

	@RequestMapping("/BH1")
	public String BH() {
		
		return "BH1";
	}
	
	@GetMapping("/getDiagnosisByPtntId")
	public ResponseEntity<List<Diagnosis>> getDiagnosisByPtntId(@RequestParam Integer ptntId) {
	    try {
	        List<Diagnosis> diagnoses = diagnosisRepository.findByPtntId(ptntId);
	        return ResponseEntity.ok(diagnoses);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	    }
	}
	

}
