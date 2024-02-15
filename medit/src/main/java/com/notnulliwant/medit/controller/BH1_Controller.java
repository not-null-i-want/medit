package com.notnulliwant.medit.controller;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

//import com.smhrd.entity.Board;
//import com.smhrd.repository.BoardRepository;

@Controller
public class BH1_Controller {

	
//	@Autowired
//	private BoardRepository repo;

	@RequestMapping("/BH1")
	public String BH() {
		
		return "BH1";
	}

}
