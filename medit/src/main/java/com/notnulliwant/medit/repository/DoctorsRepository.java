package com.notnulliwant.medit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.notnulliwant.medit.entity.Doctors;

@Repository
public interface DoctorsRepository extends JpaRepository<Doctors, String> {
   
   public Doctors findByDoctorIdAndDoctorPw(String doctorId, String doctorPw);
   
   List<Doctors> findByDoctorIdNot(String doctorId);
   
   public Doctors findByDoctorId(String doctorId);
}
