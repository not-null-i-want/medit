package com.notnulliwant.medit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.notnulliwant.medit.entity.Chatroom_Members;
import com.notnulliwant.medit.entity.Chattings;
import com.notnulliwant.medit.repository.ChattingsRepository;

@Controller
public class TestController {

	@Autowired
	private ChattingsRepository repo;
	
	@RequestMapping("/test")
	public String test() {
		
		List<Chattings> test = repo.findAll();
		
		for(Chattings n : test) {
			System.out.println(n);
		}
		
		return "Test";
	}
	
}
