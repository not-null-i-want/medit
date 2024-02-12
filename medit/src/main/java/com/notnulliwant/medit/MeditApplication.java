package com.notnulliwant.medit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
public class MeditApplication {

	public static void main(String[] args) {
		SpringApplication.run(MeditApplication.class, args);
	}

}
