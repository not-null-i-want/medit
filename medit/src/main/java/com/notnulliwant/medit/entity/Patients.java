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

import lombok.Data;

@Entity
@Data
@Table(name = "PATIENTS")
@SequenceGenerator(
	    name="patient_seq", 
	    sequenceName="PATIENT_SEQ",
	    initialValue=1,
	    allocationSize = 1
	    )
public class Patients {

	@Id
	@Column(name = "PTNT_ID")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "patient_seq")
	private Integer ptntId;
	
	@ManyToOne
	@JoinColumn(name = "doctorId")
	private Doctors doctorId;
	
	@Column(name = "PTNT_NAME")
	private String ptntName;
	
	@Column(name = "PTNT_GENDER")
	private Character ptntGender;
	
	@Column(name = "PTNT_BIRTHDATE")
	private String ptntBirthdate;
	
	@Column(name = "PTNT_ADDR")
	private String ptntAddr;
	
	@Column(name = "PTNT_PHONE")
	private String ptntPhone;
	
	@Column(name = "PTNT_TYPE")
	private Character ptntType;
	
	@Column(name = "REGISTERED_AT")
	private Date registeredAt;
	
	public String toString() {
		return "Patients";
	}
}
