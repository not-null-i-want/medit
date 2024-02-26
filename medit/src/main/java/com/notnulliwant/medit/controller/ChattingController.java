package com.notnulliwant.medit.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.notnulliwant.medit.entity.Chatrooms;
import com.notnulliwant.medit.entity.Chattings;
import com.notnulliwant.medit.entity.Doctors;
import com.notnulliwant.medit.repository.ChatroomMembersRepository;
import com.notnulliwant.medit.repository.ChattingsRepository;
import com.notnulliwant.medit.repository.DoctorsRepository;

@RestController
public class ChattingController {
	
	@Autowired
	private DoctorsRepository d_repo;
	
	@Autowired
	private ChatroomMembersRepository crm_repo;
	
	@Autowired
	private ChattingsRepository c_repo;
	
	@RequestMapping("/dlist")
	public List<Doctors> dlist(HttpSession session, Model model) {
		Doctors doctor = (Doctors) session.getAttribute("user");
		List<Doctors> dlist = d_repo.findByDoctorIdNot(doctor.getDoctorId());
		model.addAttribute("dlist", dlist);
		
		return dlist;
	}
	
	@RequestMapping("/doctor/{id}")
	public List<Chattings> doctorDetail(@PathVariable("id") String doctorId, HttpSession session, Model model) {
		Doctors doctor = (Doctors) session.getAttribute("user");
        Integer roomSeq = crm_repo.findRoomSeqByDoctorIds(doctor.getDoctorId(), doctorId);
	    
        Chatrooms chatrooms = new Chatrooms();
        chatrooms.setRoomSeq(roomSeq);
        
	    List<Chattings> test = c_repo.findAllByRoomSeq(chatrooms);
	    
	    
	    System.out.println(test);
//	    
//	    System.out.println(test);
//	    model.addAttribute("roomseq", roomSeq);
	    
	    return test;
	}

//	@PostMapping("/chat/history")
//	@ResponseBody
//	public List<Chattings> getChatHistory(@RequestParam Integer roomSeq) {
//	    return c_repo.findByRoomSeq(roomSeq);
//	}
	
}
