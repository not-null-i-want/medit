package com.notnulliwant.medit.entity;

import java.util.List;

import lombok.Data;

@Data
public class PagingPatients {

	private List<Patients> patients;
	private Boolean first;
	private Integer number;
	private Boolean last;
	private Integer totalPage;
	private Integer startPage;
	private Integer endPage;
	
}
