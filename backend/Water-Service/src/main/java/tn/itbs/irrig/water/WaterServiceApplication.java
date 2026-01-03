package tn.itbs.irrig.water;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;


@EnableDiscoveryClient
@SpringBootApplication
public class WaterServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(WaterServiceApplication.class, args);
	}

}
