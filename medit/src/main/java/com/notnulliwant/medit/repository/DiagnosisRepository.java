package com.notnulliwant.medit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.notnulliwant.medit.entity.Diagnosis;

@Repository
public interface DiagnosisRepository extends JpaRepository<Diagnosis, Integer> {
	
}
