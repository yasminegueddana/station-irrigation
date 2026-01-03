package tn.itbs.irrig.water.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "alerte_eau")
@Data
public class AlerteEau {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long pompeId;
    private Double totalEnergie;

    private LocalDateTime dateAlerte;

    // message lisible pour le front
    private String message;

    // NON_TRAITEE, EN_COURS, RESOLUE
    private String statut;

    // optionnel : niveau de gravité (INFO, WARNING, CRITIQUE)
    private String severite;
}
