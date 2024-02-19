package com.notnulliwant.medit.entity;

import java.time.LocalDateTime;

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

import lombok.Data;

@Entity
@Data
@Table(name = "CHATTINGS")
@SequenceGenerator(
	    name="chattings_seq", 
	    sequenceName="CHATTINGS_SEQ",
	    initialValue=1,
	    allocationSize = 1
	    )
public class Chattings {

	@Id
	@Column(name = "CHAT_SEQ")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "chattings_seq")
	private Integer chatSeq;
	
	@ManyToOne
	@JoinColumn(name = "roomSeq")
	private Chatrooms roomSeq;
	
	@ManyToOne
	@JoinColumn(name = "doctorId")
	private Doctors doctorId;
	
	@Column(name = "CHATTING")
	private String chatting;
	
	@Column(name = "EMOTICON")
	private String emoticon;
	
	@CreationTimestamp
	@Column(name = "CHATTED_AT", updatable = false)
	private LocalDateTime chattedAt;
	
	public String toString() {
		return "Chattings";
	}
	
}
