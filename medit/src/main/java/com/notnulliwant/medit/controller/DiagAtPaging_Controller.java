package com.notnulliwant.medit.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.notnulliwant.medit.entity.Diagnosis;
import com.notnulliwant.medit.entity.PagingDiagAt;
import com.notnulliwant.medit.entity.PagingPatients;
import com.notnulliwant.medit.entity.Patients;
import com.notnulliwant.medit.repository.DiagnosisRepository;
import com.notnulliwant.medit.repository.PatientsRepository;
import com.notnulliwant.medit.service.DiagnosisService;
import com.notnulliwant.medit.service.PatientsService;

@RestController
public class DiagAtPaging_Controller {

	@Autowired
	private DiagnosisService diagnosisService;

	@Autowired
	private DiagnosisRepository diagnosisRepo;

	// 진단 목록 페이징 //
	@GetMapping("/diagAtPaging") 
	public PagingDiagAt paging_AT(@PageableDefault(page = 1) Pageable pageable, Integer ptntId) { 
			
		Page<Diagnosis> diaList = diagnosisService.Atpaging(pageable, ptntId);
			
		List<Diagnosis> diag = diaList.getContent();
			
		PagingDiagAt pagingdiagat = new PagingDiagAt();
		  
		int blockLimit = 4; // 페이지 개수 조정 
		int startPage = (((int) Math.ceil(((double)pageable.getPageNumber() / blockLimit))) - 1) * blockLimit + 1; 
		int endPage = Math.min((startPage + blockLimit - 1), diaList.getTotalPages());
		  
		pagingdiagat.setDiagnosis(diag);
		pagingdiagat.setFirst(diaList.isFirst());
		pagingdiagat.setLast(diaList.isLast());
		pagingdiagat.setNumber(diaList.getNumber());
		pagingdiagat.setTotalPage(diaList.getTotalPages());
		pagingdiagat.setStartPage(startPage); 	
		pagingdiagat.setEndPage(endPage);
		  
		return pagingdiagat; 
		
		}
		
}
