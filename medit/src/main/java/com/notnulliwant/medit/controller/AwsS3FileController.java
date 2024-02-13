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

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @PostMapping("/fileUpload")
    public String upload(MultipartFile file) throws IOException {

    	
        String fileName = UUID.randomUUID() + file.getOriginalFilename();
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(file.getInputStream().available());
        amazonS3.putObject(bucket, fileName, file.getInputStream(), objectMetadata);
        
        // amazonS3.getUrl(bucket, fileName).toString();
        return "SM";
    }
    

}