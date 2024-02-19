package com.notnulliwant.medit.controller;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.gson.Gson;
import com.notnulliwant.medit.entity.ChatDTO;
import com.notnulliwant.medit.entity.Chatrooms;
import com.notnulliwant.medit.entity.Chattings;
import com.notnulliwant.medit.entity.Doctors;
import com.notnulliwant.medit.repository.ChattingsRepository;

@Component
public class WebSocketHandler extends TextWebSocketHandler {

	private Map<WebSocketSession, String> userRooms = new ConcurrentHashMap<>();
	private Map<String, Set<WebSocketSession>> sessions = new ConcurrentHashMap<>();

	private Gson gson = new Gson();

	@Autowired
	private ChattingsRepository c_repo;

	@Override
	public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {

		ChatDTO dto = gson.fromJson(message.getPayload().toString(), ChatDTO.class);

		Chattings chat = new Chattings();
		chat.setChatting(dto.getChatting());

		Doctors doc = new Doctors();
		doc.setDoctorId(dto.getDoctorId());
		chat.setDoctorId(doc);

		Chatrooms cr = new Chatrooms();
		cr.setRoomSeq(dto.getRoomSeq());
		chat.setRoomSeq(cr);

		c_repo.save(chat);

		if (!userRooms.containsKey(session)) {
			userRooms.put(session, Integer.toString(cr.getRoomSeq()));
			Set<WebSocketSession> roomSessions = sessions.get(Integer.toString(cr.getRoomSeq()));
			if (roomSessions == null) {
				roomSessions = new HashSet<WebSocketSession>();
				sessions.put(Integer.toString(cr.getRoomSeq()), roomSessions);
			}
			roomSessions.add(session);
		}

		String roomId = userRooms.get(session);
		if (roomId != null) {
			Set<WebSocketSession> roomSessions = sessions.get(roomId);
			if (roomSessions != null) {
				for (WebSocketSession s : roomSessions) {
					s.sendMessage(new TextMessage(gson.toJson(chat)));
				}
			}
		}
	}
}