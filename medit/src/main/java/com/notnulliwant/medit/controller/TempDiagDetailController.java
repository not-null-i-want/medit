package com.notnulliwant.medit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.amazonaws.services.s3.AmazonS3;
import com.notnulliwant.medit.repository.CxrsRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@Component
public class TempDiagDetailController {
	
	private final AmazonS3 amazonS3;
	
	@Autowired
	private CxrsRepository cxrsRepo;
	
	@Value("${cloud.aws.s3.bucket}")
    private String bucket;
	
	@RequestMapping("showDiagDetail")
	public String showDiagDetail(Integer diagSeq) {
		
		
		return "test";
	}
	
}
