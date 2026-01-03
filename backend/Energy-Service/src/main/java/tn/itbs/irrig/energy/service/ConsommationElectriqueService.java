package tn.itbs.irrig.energy.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import tn.itbs.irrig.energy.entity.ConsommationElectrique;
import tn.itbs.irrig.energy.repository.ConsommationElectriqueRepository;

@Service
@RequiredArgsConstructor
public class ConsommationElectriqueService {

    private final ConsommationElectriqueRepository repository;
    private final SurconsommationEventPublisher eventPublisher;

    public ConsommationElectrique enregistrer(ConsommationElectrique c) {
        return repository.save(c);
    }

    public List<ConsommationElectrique> getAll() {
        return repository.findAll();
    }

    public ConsommationElectrique getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consommation non trouvée avec id = " + id));
    }

    public List<ConsommationElectrique> getByPompe(Long pompeId) {
        return repository.findByPompeId(pompeId);
    }

    public ConsommationElectrique update(Long id, ConsommationElectrique updated) {
        ConsommationElectrique existing = getById(id);

        existing.setPompeId(updated.getPompeId());
        existing.setEnergieUtilisee(updated.getEnergieUtilisee());
        existing.setDuree(updated.getDuree());
        existing.setDateMesure(updated.getDateMesure());

        return repository.save(existing);
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Consommation non trouvée avec id = " + id);
        }
        repository.deleteById(id);
    }

    public Double getTotalForPompeAndPeriode(Long pompeId,
                                             LocalDateTime from,
                                             LocalDateTime to) {
        List<ConsommationElectrique> list =
                repository.findByPompeIdAndDateMesureBetween(pompeId, from, to);

        return list.stream()
                .mapToDouble(c -> c.getEnergieUtilisee() != null ? c.getEnergieUtilisee() : 0.0)
                .sum();
    }

    public boolean isSurconsommation(Long pompeId) {
        LocalDateTime to = LocalDateTime.now();
        LocalDateTime from = to.minusHours(24);

        Double total = getTotalForPompeAndPeriode(pompeId, from, to);
        double seuil = 10.0;

        boolean surconso = total != null && total > seuil;
        if (surconso) {
            eventPublisher.publishSurconsoEvent(pompeId, total);
        }
        return surconso;
    }
}
