package com.notnulliwant.medit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.notnulliwant.medit.entity.Patients;
import com.notnulliwant.medit.service.PatientsService;

@Controller
public class PatientsController {

	@Autowired
	private PatientsService patientsService;
	
	// 환자 목록 페이징 //
	@GetMapping("/paging")
	public String paging(@PageableDefault(page = 1) Pageable pageable, Model mdl) {
		Page<Patients> ptntList = patientsService.paging(pageable);
		
		int blockLimit = 3;
		
		int startPage = Math.max((((int)(Math.ceil((double)pageable.getPageNumber() / blockLimit))) - 1) * blockLimit + 1, 1);
	    int endPage = ((startPage + blockLimit - 1) < ptntList.getTotalPages()) ? startPage + blockLimit - 1 : ptntList.getTotalPages();
	    
	    mdl.addAttribute("ptntList", ptntList);
	    mdl.addAttribute("startPage", startPage);
	    mdl.addAttribute("endPage", endPage);
		return "Main";
	}
	
}
