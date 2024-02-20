package com.notnulliwant.medit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.notnulliwant.medit.entity.Diagnosis;

@Repository
public interface DiagnosisRepository extends JpaRepository<Diagnosis, Integer> {
   
   //@Query(value="SELECT * FROM DIAGNOSIS WHERE PTNT_ID = :ptntId", nativeQuery=true)
   List<Diagnosis> findAllByPtntId(Integer ptntId); // BH , 환자 번호가져올거임
   
   
}