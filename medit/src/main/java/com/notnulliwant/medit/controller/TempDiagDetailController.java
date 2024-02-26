package com.notnulliwant.medit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.notnulliwant.medit.entity.Cxrs;
import com.notnulliwant.medit.entity.Diagnosis;
import com.notnulliwant.medit.repository.CxrsRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@Component
public class TempDiagDetailController {
	
	@Autowired
	private CxrsRepository cxrsRepo;
	
	
	@RequestMapping("showDiagDetail")
	public String showDiagDetail(Integer diagSeq) {
		
		Diagnosis diag = new Diagnosis();
		diag.setDiagSeq(diagSeq);
		
		Cxrs cxrs = cxrsRepo.findByDiagSeq(diag);
		
		String cxrPath = cxrs.getCxrRealname();
		
		return cxrPath;
	}
	
}
