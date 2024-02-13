package com.notnulliwant.medit.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "CHATROOMS")
@SequenceGenerator(
	    name="chatrooms_seq", 
	    sequenceName="CHATROOMS_SEQ",
	    initialValue=1,
	    allocationSize = 1
	    )
public class Chatrooms {
	
	@Id
	@Column(name = "ROOM_SEQ")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "chatrooms_seq")
	private Integer roomSeq;
	
	private Integer roomLimit;
	
	private Date openedAt;
	
	private Character roomStatus;
	
	@OneToOne(mappedBy = "roomSeq")
	private Chatroom_Members chatroom_members;
	
	@OneToMany(mappedBy = "roomSeq")
	private List<Chattings> chattings;
	
	public String toString() {
		return "Chatrooms";
	}

}
