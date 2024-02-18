package com.notnulliwant.medit.entity;

import lombok.Data;

@Data
public class PatientsDTO {

	private Integer ptntId;

	private String doctorId;

	private String doctorName;
	
	private String ptntName;

	private Character ptntGender;

	private String ptntBirthdate;

	private String ptntAddr;
	
	private String ptntPhone;

	private Character ptntType;
	
}
