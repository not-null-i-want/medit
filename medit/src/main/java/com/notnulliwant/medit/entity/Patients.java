	package com.notnulliwant.medit.entity;

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

import org.hibernate.annotations.DynamicInsert;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.notnulliwant.medit.serializer.DoctorSerializer;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "PATIENTS") // 테이블 지정
@SequenceGenerator(name = "patients_seq", sequenceName = "PATIENTS_SEQ", initialValue = 1, allocationSize = 1)
@DynamicInsert
@NoArgsConstructor
public class Patients {

   @Id
   @Column(name = "PTNT_ID")
   @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "patients_seq") // 자동으로 값생성
   private Integer ptntId;

   @ManyToOne
   @JsonSerialize(using = DoctorSerializer.class)
   @JoinColumn(name = "doctorId")
   private Doctors doctorId;

   @Column(name = "PTNT_NAME")
   private String ptntName;

   @Column(name = "PTNT_GENDER")
   private Character ptntGender;

   @Column(name = "PTNT_BIRTHDATE")
   private String ptntBirthdate;

   @Column(name = "PTNT_ADDR")
   private String ptntAddr; // 주소 1
   
   @Column(name = "PTNT_PHONE")
   private String ptntPhone;

   @Column(name = "PTNT_TYPE")
   private Character ptntType;
   
   public String toString() {
      return "Patients";
   }
   
   // 환자 목록 페이징에 사용할 생성자
   public Patients(Integer ptntId, Doctors doctorId, String ptntName, Character ptntGender, String ptntBirthdate,
         String ptntAddr, String ptntPhone) {
      this.ptntId = ptntId;
      this.doctorId = doctorId;
      this.ptntName = ptntName;
      this.ptntGender = ptntGender;
      this.ptntBirthdate = ptntBirthdate;
      this.ptntAddr = ptntAddr;
      this.ptntPhone = ptntPhone;
   }
   
}