package com.notnulliwant.medit.serializer;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.notnulliwant.medit.entity.Patients;

public class PatientsSerializer extends JsonSerializer<Patients>{

	@Override
	public void serialize(Patients patients, JsonGenerator jsonGenerator, SerializerProvider serializers) throws IOException {
		jsonGenerator.writeStartObject();
        jsonGenerator.writeNumberField("ptntId", patients.getPtntId());
        jsonGenerator.writeEndObject();
	}
	
}
