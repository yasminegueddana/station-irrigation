package tn.itbs.irrig.water.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import tn.itbs.irrig.water.entity.DebitMesure;
import tn.itbs.irrig.water.repository.DebitMesureRepository;

@Service
@RequiredArgsConstructor
public class DebitMesureService {

    private final DebitMesureRepository repository;
    private final EnergyClientService energyClientService;

    public DebitMesure create(DebitMesure d) {
        boolean dispo = energyClientService.isPompeDisponible(d.getPompeId());
        if (!dispo) {
            throw new RuntimeException("Pompe non disponible électriquement, débit non démarré");
        }
        return repository.save(d);
    }

    public List<DebitMesure> getAll() {
        return repository.findAll();
    }

    public DebitMesure getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mesure de débit non trouvée, id=" + id));
    }

    public List<DebitMesure> getByPompe(Long pompeId) {
        return repository.findByPompeId(pompeId);
    }

    public DebitMesure update(Long id, DebitMesure d) {
        DebitMesure existing = getById(id);

        existing.setPompeId(d.getPompeId());
        existing.setDebit(d.getDebit());
        existing.setDateMesure(d.getDateMesure());
        existing.setUnite(d.getUnite());

        return repository.save(existing);
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Mesure de débit non trouvée, id=" + id);
        }
        repository.deleteById(id);
    }
}
