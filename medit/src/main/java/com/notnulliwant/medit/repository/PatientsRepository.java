package com.notnulliwant.medit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.notnulliwant.medit.entity.Patients;

@Repository
public interface PatientsRepository extends JpaRepository<Patients, Integer> {
   
   public List<Patients> findByPtntNameContaining(String keyword);
   
}