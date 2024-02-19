package com.notnulliwant.medit.controller;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.notnulliwant.medit.entity.Doctors;
import com.notnulliwant.medit.entity.Patients;
import com.notnulliwant.medit.repository.PatientsRepository;

@Controller
public class SM_Controller {
	
	@Autowired
	public PatientsRepository ptntRepo;

	
	@RequestMapping("/first")
	public String fileUpload() {
		return "SM";
	}
	
	/*@RequestMapping("#")
    public List<Patients> Search(String keyword, Model mdl) {

        List<Patients> ptntList = ptnt_repo.findByPtntNameContaining(keyword);
        
        mdl.addAttribute("ptntList", ptntList);
        
        return ptntList;
	}*/
	
}
