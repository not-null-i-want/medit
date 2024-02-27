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
import org.hibernate.annotations.DynamicInsert;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.notnulliwant.medit.serializer.DoctorSerializer;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "DIAGNOSIS")
@SequenceGenerator(
       name="diagnosis_seq", 
       sequenceName="DIAGNOSIS_SEQ",
       initialValue=1,
       allocationSize = 1
       )
@DynamicInsert
@NoArgsConstructor
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
   
   @CreationTimestamp
   @Column(name = "DIAG_AT")
   private Date diagAt;
   
   @Column(name = "DOCTOR_OPINION")
   private String doctorOpinion;
   
   @JsonManagedReference
   @OneToMany(mappedBy = "diagSeq")
   private List<Cxrs> cxrs;
   
   public String toString() {
      return "Diagnosis";
   }
   
// 진단 날짜 목록 페이징에 사용할 생성자
public Diagnosis(Integer DiagSeq, Integer PtntId, Doctors DoctorId, 
		   Date DiagAt, String DoctorOpinion ) {
   this.diagSeq = DiagSeq;
   this.ptntId = PtntId;
   this.doctorId = DoctorId;
   this.diagAt = DiagAt;
   this.doctorOpinion = DoctorOpinion;
}
   
}