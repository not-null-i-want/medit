package com.notnulliwant.medit.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "CHATROOM_MEMBERS")
@SequenceGenerator(
	    name="chatroom_members_seq", 
	    sequenceName="CHATROOM_MEMBERS_SEQ",
	    initialValue=1,
	    allocationSize = 1
	    )
public class Chatroom_Members {
	
	@Id
	@Column(name = "COMPOSITION_SEQ")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "chatroom_members_seq")
	private Integer compositionSeq;
	
	@ManyToOne
	@JoinColumn(name = "doctorId")
	private Doctors doctorId;
	
	@OneToOne
	@JoinColumn(name = "roomSeq")
	private Chatrooms roomSeq;
	
	public String toString() {
		return "Chatroom_Members";
	}

}
