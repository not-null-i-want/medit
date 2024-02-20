package com.notnulliwant.medit.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.notnulliwant.medit.entity.Diagnosis;
import com.notnulliwant.medit.entity.Patients;
import com.notnulliwant.medit.repository.DiagnosisRepository;
import com.notnulliwant.medit.repository.PatientsRepository;

@Controller
public class exam_Controller {

//   @Autowired
//   private PatientsRepository repo;

   @Autowired
   private DiagnosisRepository Diagrepo;

   @ResponseBody
   @RequestMapping("/ShowPatientAt") // 진달 날짜 띄워주는 컨트롤러임 // 트러블슈팅, postmapping으로해놔서 오류가 405오류가 뜨던걸 requestmapping으로
                              // 바꿔주니 해결됨!
   public List<Diagnosis> PtntDetail2(Integer ptntId) {

      List<Diagnosis> diag = Diagrepo.findAllByPtntId(ptntId);
      
      return diag;
   }

//   @RequestMapping("/exam")
//    public String showPatientList(Model model) {
//        List<Patients> patientsList = repo.findAll();
//        
//        model.addAttribute("patientsList", patientsList);
//        
//        return "exam";
//    }
//   
//
//    @GetMapping("/search1")
//    public String search(@RequestParam("keyword") String keyword, Model model) {
//       
//        List<Patients> patientsList = repo.findByPtntNameContaining(keyword);
//        
//        model.addAttribute("patientsList", patientsList);
//        
//        return "exam"; 
//    }

//    @ResponseBody
//    @RequestMapping("/PtntDetail1")
//   public Patients PtntDetail1(Integer PTNT_ID, Model model) {
//      
//      System.out.println(PTNT_ID);
//      
//      Patients ptnt = repo.findById(PTNT_ID).get();
//      
//      return ptnt;
//   }

//    @ResponseBody
//    @PostMapping("/PtntDetail3")
//   public List<Diagnosis> PtntDetail3(Integer PTNT_ID) {
//      
//      System.out.println(PTNT_ID);
//      System.out.println("33");
//      List<Diagnosis> diagList = repo1.findByPtntId(PTNT_ID);
//      
////      System.out.println(diag.get(0).getDiagAt()+"tt");
//      
//      
////      for (Diagnosis diagnosis : diagList) {
////           diagAt = diagnosis.getDiagAt();
////           // diagAt 값을 이용한 원하는 작업 수행
////           System.out.println(diagAt);
////       }
//      
//      return diagList;
//   }

//    @ResponseBody
//    @PostMapping("/saveOpinion")
//    public String update( Diagnosis diagnosis) {
//        
//        return "exam";
//    }

}