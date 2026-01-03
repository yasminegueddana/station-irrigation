package tn.itbs.irrig.water.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EnergyClientService {

    private final RestTemplate restTemplate;

    @Value("${energy.service.url:http://localhost:8081}")
    private String energyBaseUrl;

    public boolean isPompeDisponible(Long pompeId) {
        String url = energyBaseUrl + "/api/pompes/" + pompeId + "/disponibilite";

        @SuppressWarnings("unchecked")
        Map<String, String> resp = restTemplate.getForObject(url, Map.class);

        if (resp == null) return false;

        String dispo = resp.get("disponibilite");
        return "DISPONIBLE".equalsIgnoreCase(dispo);
    }
}