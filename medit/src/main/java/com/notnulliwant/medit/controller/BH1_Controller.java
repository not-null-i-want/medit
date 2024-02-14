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

//@Controller
//public class BH1_Controller {
////
////	
////	@Autowired
////	private BoardRepository repo;
//	
////	
//	@RequestMapping("/BH1")
//	public String BH() {
//		
//		return "BH1";
//	}
//	
//	@GetMapping("/write") // Get방식으로 요청했을때만 해당 메소드를 실행
//	public String goWrite() {
//		return "writerBoard";
////	}
////	
////	//writerBoard.jsp에서 포스트매핑이니까 위가아니라 아래에서 해주는거임
////		@PostMapping("/write")
////		public String write( MultipartFile file, Board board ) {
////			// 1. 데이터 수집
//			System.out.println( board.getWriter().getEmail() );
//			
//			// 이미지 파일 수집
//			// 1) 파일 저장시 이름이 중복될 수 없도록 고유한 이름을 부여
//			// UUID : 영문과 숫자가 섞인 랜덤한 문자열 생성
//			String uuid = UUID.randomUUID().toString();
//			// 기존 팡리 이름 + uuid
//			String filename = uuid + "_" + file.getOriginalFilename(); 
//			
//			// 2) 저장하기위한 경로를 가지고 있을 객체 생성
//			//java.nio.file 임포트
//			Path path = Paths.get( SAVE_PATH + filename );
//			
//			// 3) 파일로 저장 / 파일저장할 때는 이렇게 항상 try catch구문 안에서 해야함! 에러 날 때 꼭 써야할 거 기억하기
//			try {
//				file.transferTo(path);
//				
//				board.setImg(filename); // 파일의 이름을 저장을해라 DB에 들어가기위해 사용하는 코드
//				
//			} catch (Exception e) {
//				e.printStackTrace();
//			}
//			
//			
////			// 2. 기능 실행
////			repo.save(board);
////			
//			// 3. View 리턴
//			return "redirect:/list";
//		}
////		
//		
//}
