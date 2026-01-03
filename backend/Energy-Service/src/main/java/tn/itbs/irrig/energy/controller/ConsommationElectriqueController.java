package tn.itbs.irrig.energy.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import tn.itbs.irrig.energy.entity.ConsommationElectrique;
import tn.itbs.irrig.energy.service.ConsommationElectriqueService;

@RestController
@RequestMapping("/api/consommations")
@RequiredArgsConstructor
public class ConsommationElectriqueController {

    private final ConsommationElectriqueService service;

    @PostMapping
    public ResponseEntity<ConsommationElectrique> create(@RequestBody ConsommationElectrique c) {
        ConsommationElectrique saved = service.enregistrer(c);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping
    public List<ConsommationElectrique> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ConsommationElectrique getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ConsommationElectrique> update(@PathVariable Long id,
                                                         @RequestBody ConsommationElectrique c) {
        ConsommationElectrique updated = service.update(id, c);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/pompe/{pompeId}")
    public List<ConsommationElectrique> getByPompe(@PathVariable Long pompeId) {
        return service.getByPompe(pompeId);
    }

    @GetMapping("/pompe/{pompeId}/total")
    public Double getTotalByPompeAndPeriode(
            @PathVariable Long pompeId,
            @RequestParam("from")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime from,
            @RequestParam("to")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime to) {

        return service.getTotalForPompeAndPeriode(pompeId, from, to);
    }

    @GetMapping("/pompe/{pompeId}/alerte")
    public Map<String, Object> checkAlerteSurconsommation(@PathVariable Long pompeId) {

        boolean surconso = service.isSurconsommation(pompeId);

        Map<String, Object> result = new HashMap<>();
        result.put("pompeId", pompeId);
        result.put("surconsommation", surconso);
        result.put("message", surconso
                ? "Consommation électrique excessive sur les dernières 24h"
                : "Consommation électrique normale sur les dernières 24h");

        return result;
    }
}