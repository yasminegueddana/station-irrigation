package tn.itbs.irrig.water.controller;

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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import tn.itbs.irrig.water.entity.DebitMesure;
import tn.itbs.irrig.water.service.DebitMesureService;

@RestController
@RequestMapping("/api/debits")
@RequiredArgsConstructor
public class DebitMesureController {

    private final DebitMesureService service;

    @PostMapping
    public ResponseEntity<DebitMesure> create(@RequestBody DebitMesure d) {
        return new ResponseEntity<>(service.create(d), HttpStatus.CREATED);
    }

    @GetMapping
    public List<DebitMesure> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public DebitMesure getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @GetMapping("/pompe/{pompeId}")
    public List<DebitMesure> getByPompe(@PathVariable Long pompeId) {
        return service.getByPompe(pompeId);
    }

    @PutMapping("/{id}")
    public DebitMesure update(@PathVariable Long id, @RequestBody DebitMesure d) {
        return service.update(id, d);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
