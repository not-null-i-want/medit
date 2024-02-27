package com.notnulliwant.medit.entity;

import java.util.List;

import lombok.Data;

@Data
public class PagingDiagAt {

	private List<Diagnosis> diagnosis;
	private Boolean first;
	private Integer number;
	private Boolean last;
	private Integer totalPage;
	private Integer startPage;
	private Integer endPage;
	
}
