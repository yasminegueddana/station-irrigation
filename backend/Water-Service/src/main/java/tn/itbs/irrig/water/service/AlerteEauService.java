package tn.itbs.irrig.water.service;

import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import tn.itbs.irrig.water.entity.AlerteEau;
import tn.itbs.irrig.water.repository.AlerteEauRepository;

@Service
@RequiredArgsConstructor
public class AlerteEauService {

    private static final Logger log = LoggerFactory.getLogger(AlerteEauService.class);
    private final AlerteEauRepository repo;

    public void enregistrerAlerte(Long pompeId, Double totalEnergie) {
        AlerteEau alerte = new AlerteEau();
        alerte.setPompeId(pompeId);
        alerte.setTotalEnergie(totalEnergie);
        alerte.setDateAlerte(LocalDateTime.now());
        alerte.setMessage("Surconsommation électrique détectée");
        alerte.setStatut("NON_TRAITEE");
        alerte.setSeverite("CRITIQUE");
        repo.save(alerte);

        log.warn("ALERTE EAU enregistrée pour pompe {} énergie={}", pompeId, totalEnergie);
    }

    public List<AlerteEau> getAlertes() {
        return repo.findAll();
    }

    public AlerteEau updateStatut(Long id, String nouveauStatut) {
        AlerteEau alerte = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Alerte non trouvée, id=" + id));

        alerte.setStatut(nouveauStatut);
        return repo.save(alerte);
    }
}

