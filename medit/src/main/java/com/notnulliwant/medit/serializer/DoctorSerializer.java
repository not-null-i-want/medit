package com.notnulliwant.medit.serializer;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.notnulliwant.medit.entity.Doctors;

public class DoctorSerializer extends JsonSerializer<Doctors>{	
	
	@Override
	public void serialize(Doctors doctor, JsonGenerator jsonGenerator, SerializerProvider serializers) throws IOException {
		jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("doctorId", doctor.getDoctorId());
        jsonGenerator.writeStringField("doctorName", doctor.getDoctorName());
        jsonGenerator.writeEndObject();
	}
}
