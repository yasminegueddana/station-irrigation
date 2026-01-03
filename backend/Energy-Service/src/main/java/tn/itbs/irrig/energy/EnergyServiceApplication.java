package tn.itbs.irrig.energy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;


@EnableDiscoveryClient
@SpringBootApplication
public class EnergyServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(EnergyServiceApplication.class, args);
	}

}
