package com.notnulliwant.medit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.notnulliwant.medit.entity.Cxrs;
import com.notnulliwant.medit.entity.Diagnosis;

@Repository
public interface CxrsRepository extends JpaRepository<Cxrs, Integer>{

	Cxrs findByDiagSeq(Diagnosis diagSeq);
	
	Cxrs findCxrSeqByCxrRealname(String cxrRealname);
	
}
