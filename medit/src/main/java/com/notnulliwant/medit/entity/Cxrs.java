package com.notnulliwant.medit.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;

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
	
	@Id
	@Column(name = "CXR_SEQ")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "cxrs_seq")
	private Integer cxrSeq;
	
	@JsonBackReference 
	@ManyToOne
	@JoinColumn(name = "diagSeq")
	private Diagnosis diagSeq;
	
	@Column(name = "CXR_NAME")
	private String cxrName;
	
	@Column(name = "CXR_REALNAME")
	private String cxrRealname;
	
	@Column(name = "CXR_SIZE")
	private Long cxrSize;
	
	@Column(name = "CXR_EXT")
	private String cxrExt;
	
	@CreationTimestamp
	@Column(name = "CREATED_AT")
	private Date createdAt;
	
	@CreationTimestamp
	@Column(name = "UPLOADED_AT")
	private Date uploadedAt;
	
	@Column(name = "CXR_ORIGINAL")
	private Character cxrOriginal;
	
	@JsonBackReference
	@OneToMany(mappedBy = "cxrSeq")
	private List<Deeps> deeps;
	
	public String toString() {
		return "Cxrs";
	}
	
}
