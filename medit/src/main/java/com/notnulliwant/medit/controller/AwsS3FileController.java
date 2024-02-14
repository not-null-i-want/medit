package com.notnulliwant.medit.controller;

import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@Component
public class AwsS3FileController {
	

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket-cxrs}")
    private String bucket;

    @PostMapping("/fileUpload")
    public String upload(MultipartFile file) throws IOException {

        String fileName = UUID.randomUUID() + file.getOriginalFilename(); // UUID + 업로드 파일 이름
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(file.getInputStream().available());
        amazonS3.putObject(bucket, fileName, file.getInputStream(), objectMetadata); // 업로드
        
        // 확장자 추출
        int index = fileName.lastIndexOf(".");
        if(index > 0) {
        	String extension = fileName.substring(index + 1);	
        }
        
        
        // 영상번호 			: seq
        // 진단번호 			: FK
        // 영상이미지명 		: fileName
        // 영상 실제 이미지명 	: amazonS3.getUrl(bucket, fileName).toString()
        // 영상 사이즈 			: file.getSize()
        // 영상 사이즈 확장자	: extension
        // 영상 촬영일시 		: 클라이언트 입력
        // 업로드 일시 			: 즉시
        // 영상 원본 유무 		: 일단 0
        
        
        // amazonS3.getUrl(bucket, fileName).toString();
        System.out.println(amazonS3.getUrl(bucket, fileName).toString());
        return "SM";
    }
    

}