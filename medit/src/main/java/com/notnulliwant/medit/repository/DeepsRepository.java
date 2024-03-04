package com.notnulliwant.medit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.notnulliwant.medit.entity.Cxrs;
import com.notnulliwant.medit.entity.Deeps;

@Repository
public interface DeepsRepository extends JpaRepository<Deeps, Integer>{

	Deeps findByCxrSeq(Cxrs deepCxr);

}
