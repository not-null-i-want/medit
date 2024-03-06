package com.notnulliwant.medit.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.notnulliwant.medit.entity.Cxrs;
import com.notnulliwant.medit.entity.Deeps;
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

      System.out.println(diagnosis.getDoctorId().getDoctorId());
      System.out.println(diagnosis.getPtntId());

      Diagnosis diag = diagRepo.save(diagnosis); // DB 진단 추가

      Integer diagSeq = diag.getDiagSeq(); // 진단번호

      String fileName = UUID.randomUUID() + file.getOriginalFilename(); // UUID + 업로드 파일 이름
      ObjectMetadata objectMetadata = new ObjectMetadata();
      objectMetadata.setContentLength(file.getInputStream().available());
      amazonS3.putObject(bucket, fileName, file.getInputStream(), objectMetadata); // 업로드

      String fileRealName = amazonS3.getUrl(bucket, fileName).toString(); // S3 주소 + 파일 이름

      RestTemplate r = new RestTemplate();
      String flask = "http://192.168.219.54:5000/process_image";
      /* String flask = "http://127.0.0.1:5000/process_image"; */

      Map<String, String> map = new HashMap<>();
      map.put("image_url", fileRealName);

      org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_JSON);

      HttpEntity<Map<String, String>> request = new HttpEntity<>(map, headers);
      ResponseEntity<String> response = r.postForEntity(flask, request, String.class);
      String body = response.getBody();
      System.out.println(body);

      ObjectMapper mapper = new ObjectMapper();
      Map<String, Object> map1 = mapper.readValue(body, new TypeReference<Map<String, Object>>() {
      });
      String s3_url = (String) map1.get("s3_url");
      if (s3_url != null) {
          List<String> result = (List<String>) map1.get("result");
          String resultStr = mapper.writeValueAsString(result);
          List<Map<String, String>> result1 = (List<Map<String, String>>) map1.get("result");
          String resultStr1 = mapper.writeValueAsString(result1);

          // 확장자 추출
          String extension = "";
          int index = fileName.lastIndexOf(".");
          if (index > 0) {
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

          cxrsRepo.save(cxrs); // DB 원본 CXR 추가

          Cxrs cxrs2 = new Cxrs();

          cxrs2.setDiagSeq(tempDiagnosis);
          cxrs2.setCxrName(fileName);
          cxrs2.setCxrRealname(s3_url);
          cxrs2.setCxrSize(file.getSize());
          cxrs2.setCxrExt(extension);
          cxrs2.setCxrOriginal('1');

          cxrsRepo.save(cxrs2); // DB 출력 CXR 추가

          Cxrs cxrseq = cxrsRepo.findCxrSeqByCxrRealname(s3_url);

          Deeps deep = new Deeps();

          deep.setCxrSeq(cxrseq);
          deep.setDeepResult(resultStr1);

          deepsRepo.save(deep);
      }
      return "redirect:/Main";
   }

}