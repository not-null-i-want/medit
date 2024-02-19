package com.notnulliwant.medit.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.notnulliwant.medit.entity.Doctors;
import com.notnulliwant.medit.entity.Patients;
import com.notnulliwant.medit.repository.PatientsRepository;

@Service
public class PatientsService {
	
	@Autowired
	public PatientsRepository ptntRepo;

	
	// 환자 목록 페이징 //
	public Page<Patients> paging(Pageable pageable) {

		int page = pageable.getPageNumber() - 1;
		int pageLimit = 5; // 한 번에 출력되는 페이지 수
	
		Pageable pageRequest = PageRequest.of(page, pageLimit, Sort.by("ptntId").descending());

		Page<Patients> ptntEntities = ptntRepo.findAll(pageRequest);

		Page<Patients> ptntList = ptntEntities.map(patient -> new Patients(patient.getPtntId(), patient.getDoctorId(),
				patient.getPtntName(), patient.getPtntGender(), patient.getPtntBirthdate(), patient.getPtntAddr(),
				patient.getPtntPhone()));

		return ptntList;
	}
	
	
}
