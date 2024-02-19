package com.notnulliwant.medit.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.notnulliwant.medit.entity.Doctors;
import com.notnulliwant.medit.repository.ChatroomMembersRepository;
import com.notnulliwant.medit.repository.DoctorsRepository;

@Controller
public class YH_Controller {
	
	@Autowired
	private DoctorsRepository d_repo;
	
	@Autowired
	private ChatroomMembersRepository crm_repo;
	
	@RequestMapping("/dlist")
	public String dlist(HttpSession session, Model model) {
		Doctors doctor = (Doctors) session.getAttribute("user");
		List<Doctors> dlist = d_repo.findByDoctorIdNot(doctor.getDoctorId());
		model.addAttribute("dlist", dlist);
		
		return "chat";
	}
	
	@RequestMapping("/doctor/{id}")
	public String doctorDetail(@PathVariable("id") String doctorId, HttpSession session, Model model) {
		Doctors d_s = (Doctors) session.getAttribute("user");
	    Doctors doc = d_repo.findByDoctorId(doctorId);
	    Integer roomSeq = crm_repo.findRoomSeqByDoctorIds(d_s.getDoctorId(), doctorId);
	    
	    model.addAttribute("roomseq", roomSeq);
	    
	    return "yh";
	}


}
