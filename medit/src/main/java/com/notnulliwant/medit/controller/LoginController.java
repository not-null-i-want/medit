package com.notnulliwant.medit.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.notnulliwant.medit.entity.Doctors;
import com.notnulliwant.medit.repository.DoctorsRepository;

@Controller
public class LoginController {

	@Autowired
	private DoctorsRepository repo;
	
	@RequestMapping("/loginPage")
	public String loginPage() {
		return "Login";
	}
	   
	@RequestMapping("/login")
	public String login(Doctors doctor, HttpSession session, Model model) {
	      
		Doctors result = repo.findByDoctorIdAndDoctorPw(doctor.getDoctorId(), doctor.getDoctorPw());
	    System.out.println(result);
	    if(result != null) {
	    	session.setAttribute("user", result);
	        return "Main";
	    } else {
	        return "Login"; // 로그인 실패 시 다시 로그인 페이지로 이동
	    }       
	}
	
}
