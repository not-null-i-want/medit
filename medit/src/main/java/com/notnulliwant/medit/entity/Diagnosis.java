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

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.notnulliwant.medit.serializer.DoctorSerializer;

import lombok.Data;

@Entity
@Data
@Table(name = "DIAGNOSIS")
@SequenceGenerator(
       name="diagnosis_seq", 
       sequenceName="DIAGNOSIS_SEQ",
       initialValue=1,
       allocationSize = 1
       )
public class Diagnosis {
   
   @Id
   @Column(name = "DIAG_SEQ")
   @GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "diagnosis_seq")
   private Integer diagSeq;
   
   @Column(name = "PTNT_ID")
   private Integer ptntId;
   
   @ManyToOne
   @JsonSerialize(using = DoctorSerializer.class)
   @JoinColumn(name = "doctorId")
   private Doctors doctorId;
   
   @Column(name = "DIAG_AT")
   private Date diagAt;
   
   @Column(name = "DOCTOR_OPINION")
   private String doctorOpinion;
   
   @OneToMany(mappedBy = "diagSeq")
   private List<Cxrs> cxrs;
   
   public String toString() {
      return "Diagnosis";
   }
   
}