package com.notnulliwant.medit.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "CXRS")
@SequenceGenerator(
	    name="cxrs_seq", 
	    sequenceName="CXRS_SEQ",
	    initialValue=1,
	    allocationSize = 1
	    )
public class Cxrs {
	
	private Integer cxrSeq;
	
	

}
