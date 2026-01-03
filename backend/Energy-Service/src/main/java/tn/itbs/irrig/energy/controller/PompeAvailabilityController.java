package tn.itbs.irrig.energy.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import tn.itbs.irrig.energy.service.PompeStatusService;

@RestController
@RequestMapping("/api/pompes")
@RequiredArgsConstructor
public class PompeAvailabilityController {

    private final PompeStatusService statusService;

    @GetMapping("/{id}/disponibilite")
    public Map<String, String> getDisponibilite(@PathVariable Long id) {
        String dispo = statusService.getDisponibilite(id);

        Map<String, String> resp = new HashMap<>();
        resp.put("pompeId", String.valueOf(id));
        resp.put("disponibilite", dispo);
        return resp;
    }
}