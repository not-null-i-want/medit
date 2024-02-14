package com.notnulliwant.medit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.notnulliwant.medit.entity.Patients;

@Repository
public interface PatientsRepository extends JpaRepository<Patients, Integer> {

}
