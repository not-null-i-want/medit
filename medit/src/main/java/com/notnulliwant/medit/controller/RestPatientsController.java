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

import com.notnulliwant.medit.entity.PagingPatients;
import com.notnulliwant.medit.entity.Patients;
import com.notnulliwant.medit.repository.PatientsRepository;
import com.notnulliwant.medit.service.PatientsService;

@RestController
public class RestPatientsController {

	@Autowired
	private PatientsService patientsService;
	
	@Autowired
	private PatientsRepository patientsRepo;
	
	// 환자 목록 페이징 //
	@GetMapping("/paging")
	public PagingPatients paging(@PageableDefault(page = 1) Pageable pageable, Model mdl) {
		Page<Patients> ptntList = patientsService.paging(pageable);

        List<Patients> ptnts = ptntList.getContent();
        
        PagingPatients pagingpatients = new PagingPatients();
        
        int blockLimit = 5; // 페이지 개수 조정
        int startPage = (((int) Math.ceil(((double) pageable.getPageNumber() / blockLimit))) - 1) * blockLimit + 1;
        int endPage = Math.min((startPage + blockLimit - 1), ptntList.getTotalPages());
        
        pagingpatients.setPatients(ptnts);
        pagingpatients.setFirst(ptntList.isFirst());
        pagingpatients.setLast(ptntList.isLast());
        pagingpatients.setNumber(ptntList.getNumber());
        pagingpatients.setTotalPage(ptntList.getTotalPages());
        pagingpatients.setStartPage(startPage);
        pagingpatients.setEndPage(endPage);
        
		return pagingpatients;
	}
	
	// 환자 상세정보 출력  //
	@RequestMapping("/ShowPatientDetail")
	public Patients patientDetail(Integer ptntId) {

		Optional<Patients> result = patientsRepo.findById(ptntId);
		
		Patients resultPtnt = result.get();
		
		return resultPtnt;
	}
	
	// 환자 검색 후 페이징 //
	@RequestMapping("/searchPaging")
    public PagingPatients search(@PageableDefault(page = 1) Pageable pageable, String ptntName) {
       
		Page<Patients> ptntList = patientsService.searchPaging(pageable, ptntName);
		
		List<Patients> ptnts = ptntList.getContent();
		
		PagingPatients pagingpatients = new PagingPatients();
        
        int blockLimit = 5;
        int startPage = (((int) Math.ceil(((double) pageable.getPageNumber() / blockLimit))) - 1) * blockLimit + 1;
        int endPage = Math.min((startPage + blockLimit - 1), ptntList.getTotalPages());
        
        pagingpatients.setPatients(ptnts);
        pagingpatients.setFirst(ptntList.isFirst());
        pagingpatients.setLast(ptntList.isLast());
        pagingpatients.setNumber(ptntList.getNumber());
        pagingpatients.setTotalPage(ptntList.getTotalPages());
        pagingpatients.setStartPage(startPage);
        pagingpatients.setEndPage(endPage);
        	
        return pagingpatients;
    }
	
	
}
