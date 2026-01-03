package tn.itbs.irrig.water.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import tn.itbs.irrig.water.entity.AlerteEau;
import tn.itbs.irrig.water.service.AlerteEauService;

@RestController
@RequestMapping("/api/alertes-eau")
@RequiredArgsConstructor
public class AlerteEauController {

    private final AlerteEauService service;

    @GetMapping
    public List<AlerteEau> getAll() {
        return service.getAlertes();
    }

    // Exemple : PUT /api/alertes-eau/5/statut?value=RESOLUE
    @PutMapping("/{id}/statut")
    public AlerteEau updateStatut(@PathVariable Long id,
                                  @RequestParam("value") String value) {
        return service.updateStatut(id, value);
    }
}