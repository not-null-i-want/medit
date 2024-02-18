package com.notnulliwant.medit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.notnulliwant.medit.entity.PagingPatients;
import com.notnulliwant.medit.entity.Patients;
import com.notnulliwant.medit.service.PatientsService;

@Controller
public class PatientsController {

	@Autowired
	private PatientsService patientsService;
	
	// 환자 목록 페이징 //
	@GetMapping("/paging")
	@ResponseBody
	public PagingPatients paging(@PageableDefault(page = 1) Pageable pageable, Model mdl) {
		Page<Patients> ptntList = patientsService.paging(pageable);

        List<Patients> ptnts = ptntList.getContent();
        
        PagingPatients pagingpatients = new PagingPatients();
        
        pagingpatients.setPatients(ptnts);
        pagingpatients.setFirst(ptntList.isFirst());
        pagingpatients.setLast(ptntList.isLast());
        pagingpatients.setNumber(ptntList.getNumber());
        pagingpatients.setTotalPage(ptntList.getTotalPages());
        
		return pagingpatients;
	}
	
}
