package tn.itbs.irrig.energy.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import tn.itbs.irrig.energy.entity.Pompe;
import tn.itbs.irrig.energy.repository.PompeRepository;

@Service
@RequiredArgsConstructor
public class PompeService {

    private final PompeRepository pompeRepository;

    public Pompe createPompe(Pompe pompe) {
        return pompeRepository.save(pompe);
    }

    public List<Pompe> getAllPompes() {
        return pompeRepository.findAll();
    }

    public Pompe getPompeById(Long id) {
        return pompeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pompe non trouvée avec id = " + id));
    }

    public Pompe updatePompe(Long id, Pompe pompe) {
        Pompe existing = getPompeById(id); 

        existing.setReference(pompe.getReference());
        existing.setPuissance(pompe.getPuissance());
        existing.setStatut(pompe.getStatut());
        existing.setDateMiseEnService(pompe.getDateMiseEnService());

        return pompeRepository.save(existing);
    }

    public void deletePompe(Long id) {
        if (!pompeRepository.existsById(id)) {
            throw new RuntimeException("Pompe non trouvée avec id = " + id);
        }
        pompeRepository.deleteById(id);
    }
}
