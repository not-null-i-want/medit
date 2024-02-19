package com.notnulliwant.medit.entity;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ChatDTO {
	
	private Integer chatSeq;
	
	private Integer roomSeq;
	
	private String doctorId;
	
	private String chatting;
	
	private String emoticon;
	
	private LocalDateTime chattedAt;
	
}
