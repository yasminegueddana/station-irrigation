package tn.itbs.irrig.energy.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PompeStatusService {

    private final PompeService pompeService;
    private final ConsommationElectriqueService consoService;

    public String getDisponibilite(Long pompeId) {
        var pompe = pompeService.getPompeById(pompeId);

        if ("EN_PANNE".equalsIgnoreCase(pompe.getStatut())) {
            return "NON_DISPONIBLE";
        }

        boolean surconso = consoService.isSurconsommation(pompeId);
        if (surconso) {
            return "NON_DISPONIBLE";
        }

        return "DISPONIBLE";
    }
}