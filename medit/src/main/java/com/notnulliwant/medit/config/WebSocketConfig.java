package com.notnulliwant.medit.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.notnulliwant.medit.controller.WebSocketHandler;

import lombok.RequiredArgsConstructor;

@EnableWebSocket // websocket을 사용할 것이다
@RequiredArgsConstructor
@Configuration
public class WebSocketConfig implements WebSocketConfigurer {

	private final WebSocketHandler socket;
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {

		registry.addHandler(socket, "/chat").setAllowedOriginPatterns("*");

	}

}
