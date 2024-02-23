package com.notnulliwant.medit.controller;

import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.notnulliwant.medit.entity.Cxrs;
import com.notnulliwant.medit.entity.Diagnosis;
import com.notnulliwant.medit.repository.CxrsRepository;
import com.notnulliwant.medit.repository.DeepsRepository;
import com.notnulliwant.medit.repository.DiagnosisRepository;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@Component
public class DiagnosisController {

	private final AmazonS3 amazonS3;
	
	@Autowired
	private DiagnosisRepository diagRepo;
	
	@Autowired
	private CxrsRepository cxrsRepo;
	
	@Autowired
	private DeepsRepository deepsRepo;
	
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
	
	@RequestMapping("/diagnose")
	public String diagnose(MultipartFile file, Diagnosis diagnosis) throws IOException {
		
		
		Diagnosis diag = diagRepo.save(diagnosis); // DB 진단 추가
		
		Integer diagSeq = diag.getDiagSeq(); // 진단번호
		
		String fileName = UUID.randomUUID() + file.getOriginalFilename(); // UUID + 업로드 파일 이름
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(file.getInputStream().available());
        amazonS3.putObject(bucket, fileName, file.getInputStream(), objectMetadata); // 업로드
        
        String fileRealName = amazonS3.getUrl(bucket, fileName).toString(); // S3 주소 + 파일 이름
        
        // 확장자 추출
        String extension = "";
        int index = fileName.lastIndexOf(".");
        if(index > 0) {
        	extension = fileName.substring(index + 1);
        }
        
        Cxrs cxrs = new Cxrs();
        Diagnosis tempDiagnosis = new Diagnosis();
        tempDiagnosis.setDiagSeq(diagSeq);
        
        cxrs.setDiagSeq(tempDiagnosis);
        cxrs.setCxrName(fileName);
        cxrs.setCxrRealname(fileRealName);
        cxrs.setCxrSize(file.getSize());
        cxrs.setCxrExt(extension);
        cxrs.setCxrOriginal('0');
        
        cxrsRepo.save(cxrs); // DB CXR 추가
        
        return "SM";
	}
	
}