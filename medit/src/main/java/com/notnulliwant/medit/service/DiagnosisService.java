package com.notnulliwant.medit.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.notnulliwant.medit.entity.Diagnosis;
import com.notnulliwant.medit.entity.Doctors;
import com.notnulliwant.medit.entity.Patients;
import com.notnulliwant.medit.repository.DiagnosisRepository;
import com.notnulliwant.medit.repository.PatientsRepository;

@Service
public class DiagnosisService {
	
	@Autowired
	public DiagnosisRepository diagRepo;

	
	// 진단 목록 페이징 //
		public Page<Diagnosis> Atpaging(Pageable pageable, Integer ptntId ) {

			int page = pageable.getPageNumber() - 1;
			int pageLimit = 4; // 한 번에 출력되는 페이지 수
		
			Pageable pageRequest = PageRequest.of(page, pageLimit, Sort.by("diagSeq").descending());

			Page<Diagnosis> diagEntities = diagRepo.findByPtntId(pageRequest, ptntId);
			
			Page<Diagnosis> diagList = diagEntities.map(diagnosis -> new Diagnosis(diagnosis.getDiagSeq(), diagnosis.getPtntId(), 
					diagnosis.getDoctorId(), diagnosis.getDiagAt(), 
					diagnosis.getDoctorOpinion()));
			 
			return diagList;
			
		}
	 } 