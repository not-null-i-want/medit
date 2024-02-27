package com.notnulliwant.medit.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.notnulliwant.medit.entity.Diagnosis;
import com.notnulliwant.medit.entity.Doctors;

@Repository
public interface DiagnosisRepository extends JpaRepository<Diagnosis, Integer> {
   
   List<Diagnosis> findAllByPtntId(Integer ptntId); // BH , 환자 번호가져올거임
   
   Diagnosis findAllBydiagSeq(Integer diagSeq);  // 의사소견쪽
   
   public Page<Diagnosis> findByPtntId(Pageable pageable, Integer keyword);
   
   @Transactional
   @Modifying
   @Query("UPDATE Diagnosis d SET d.doctorOpinion = :doctorOpinion WHERE d.diagSeq = :diagSeq")
   void updateDoctorOpinionByDiagSeq(@Param("diagSeq") Integer diagSeq, @Param("doctorOpinion") String doctorOpinion);
   
}