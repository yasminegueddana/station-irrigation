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
import tn.itbs.irrig.water.entity.Reservoir;
import tn.itbs.irrig.water.service.ReservoirService;

@RestController
@RequestMapping("/api/reservoirs")
@RequiredArgsConstructor
public class ReservoirController {

    private final ReservoirService service;

    @PostMapping
    public ResponseEntity<Reservoir> create(@RequestBody Reservoir r) {
        return new ResponseEntity<>(service.create(r), HttpStatus.CREATED);
    }

    @GetMapping
    public List<Reservoir> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Reservoir getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public Reservoir update(@PathVariable Long id, @RequestBody Reservoir r) {
        return service.update(id, r);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}