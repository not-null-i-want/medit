package com.notnulliwant.medit.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.notnulliwant.medit.entity.Doctors;
import com.notnulliwant.medit.repository.DoctorsRepository;

@Controller
public class DH_Controller {
   
   @Autowired
   private DoctorsRepository repo;
   
   @RequestMapping("/login")
   public String login(Doctors doctor, HttpSession session, Model model) {
      
         Doctors result = repo.findByDoctorIdAndDoctorPw(doctor.getDoctorId(), doctor.getDoctorPw());
      
         if(result != null) {
            session.setAttribute("user", result);
            return "Test";
         } else {
            model.addAttribute("errorMessage", "아이디 또는 비밀번호가 잘못되었습니다. 다시 입력해주세요.");
               return "login"; // 로그인 실패 시 다시 로그인 페이지로 이동
           }   
      
   }
   
}
