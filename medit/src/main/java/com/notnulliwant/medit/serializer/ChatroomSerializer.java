package com.notnulliwant.medit.serializer;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.notnulliwant.medit.entity.Chatrooms;
import com.notnulliwant.medit.entity.Chattings;

public class ChatroomSerializer extends JsonSerializer<Chatrooms> {
	
	@Override
	public void serialize(Chatrooms chatroom, JsonGenerator jsonGenerator, SerializerProvider serializers) throws IOException {
		jsonGenerator.writeStartObject();
		jsonGenerator.writeNumberField("roomSeq", chatroom.getRoomSeq());
		jsonGenerator.writeEndObject();
	}
}
