package tn.itbs.irrig.energy.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import tn.itbs.irrig.energy.entity.Pompe;
import tn.itbs.irrig.energy.service.PompeService;

@RestController
@RequestMapping("/api/pompes")
@RequiredArgsConstructor
public class PompeController {

    private final PompeService pompeService;

    @PostMapping
    public ResponseEntity<Pompe> createPompe(@RequestBody Pompe pompe) {
        Pompe saved = pompeService.createPompe(pompe);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Pompe> getAllPompes() {
        return pompeService.getAllPompes();
    }

    @GetMapping("/{id}")
    public Pompe getPompeById(@PathVariable Long id) {
        return pompeService.getPompeById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pompe> updatePompe(@PathVariable Long id,
                                             @RequestBody Pompe pompe) {
        Pompe updated = pompeService.updatePompe(id, pompe);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePompe(@PathVariable Long id) {
        pompeService.deletePompe(id);
        return ResponseEntity.noContent().build();
    }
}