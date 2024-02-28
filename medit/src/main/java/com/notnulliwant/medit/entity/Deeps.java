package com.notnulliwant.medit.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Data;

@Entity
@Data
@Table(name = "Deeps")
@SequenceGenerator(
	    name="deeps_seq", 
	    sequenceName="DEEPS_SEQ",
	    initialValue=1,
	    allocationSize = 1
	    )
public class Deeps {
	
	@Id
	@Column(name = "DEEP_SEQ")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "deeps_seq")
	private Integer deepSeq;
	
	@JsonManagedReference
	@ManyToOne
	@JoinColumn(name = "cxrSeq")
	private Cxrs cxrSeq;
	
	@Column(name = "DEEP_RESULT")
	private String deepResult;
	
	@CreationTimestamp
	@Column(name = "CREATED_AT")
	private Date createdAt;
	
	public String toString() {
		return "Deeps";
	}

}
