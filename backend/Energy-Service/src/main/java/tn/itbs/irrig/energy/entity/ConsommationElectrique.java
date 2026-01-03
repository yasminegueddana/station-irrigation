package tn.itbs.irrig.energy.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "consommation_electrique")
public class ConsommationElectrique {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long pompeId;

    @Column(nullable = false)
    private Double energieUtilisee;

    private Double duree;

    @Column(nullable = false)
    private LocalDateTime dateMesure;
}
