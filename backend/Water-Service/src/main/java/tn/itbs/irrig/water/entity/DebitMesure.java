package tn.itbs.irrig.water.entity;

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
@Table(name = "debit_mesure")
public class DebitMesure {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long pompeId;      // référence à la pompe côté Energie

    @Column(nullable = false)
    private Double debit;      

    @Column(nullable = false)
    private LocalDateTime dateMesure;

    private String unite;     
}