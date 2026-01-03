package tn.itbs.irrig.water.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import tn.itbs.irrig.water.entity.Reservoir;
import tn.itbs.irrig.water.repository.ReservoirRepository;

@Service
@RequiredArgsConstructor
public class ReservoirService {

    private final ReservoirRepository repository;

    public Reservoir create(Reservoir r) {
        return repository.save(r);
    }

    public List<Reservoir> getAll() {
        return repository.findAll();
    }

    public Reservoir getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Réservoir non trouvé, id=" + id));
    }

    public Reservoir update(Long id, Reservoir r) {
        Reservoir existing = getById(id);
        existing.setNom(r.getNom());
        existing.setCapaciteTotale(r.getCapaciteTotale());
        existing.setVolumeActuel(r.getVolumeActuel());
        existing.setLocalisation(r.getLocalisation());
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}