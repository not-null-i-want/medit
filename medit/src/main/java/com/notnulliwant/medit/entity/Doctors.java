package com.notnulliwant.medit.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "DOCTORS")
public class Doctors {

	@Id
	@Column(name = "DOCTOR_ID")
	private String doctorId;
	
	@Column(name = "DOCTOR_PW")
	private String doctorPw;
	
	@Column(name = "DOCTOR_NAME")
	private String doctorName;
	
	@Column(name = "DOCTOR_PHONE")
	private String doctorPhone;
	
	@OneToMany(mappedBy = "doctorId")
	private List<Patients> patient;
	
	@OneToMany(mappedBy = "doctorId")
	private List<Diagnosis> diagnosis;
	
	@OneToMany(mappedBy = "doctorId")
	private List<Chatroom_Members> chatroom_members;
	
	@OneToMany(mappedBy = "doctorId")
	private List<Chattings> chattings;
	
	public String toString() {
		return "Doctors";
	}
	
}
