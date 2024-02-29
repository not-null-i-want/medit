package com.notnulliwant.medit.controller;

import java.util.List;

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
	public String[] showDiagDetail(Integer diagSeq) {

	    Diagnosis diag = new Diagnosis();
	    diag.setDiagSeq(diagSeq);

	    List<Cxrs> cxrsList = cxrsRepo.findByDiagSeq(diag);

	    String[] cxrPaths = new String[cxrsList.size()];

	    for (int i = 0; i < cxrsList.size(); i++) {
	        Cxrs cxrs = cxrsList.get(i);
	        cxrPaths[i] = cxrs.getCxrRealname();
	    }
	    
	    System.out.println(cxrPaths[0]);
	    System.out.println(cxrPaths[1]);
	    
	    
	    return cxrPaths;
	}	
	
}
