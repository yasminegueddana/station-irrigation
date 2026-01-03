package tn.itbs.irrig.water.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import tn.itbs.irrig.water.entity.DebitMesure;

public interface DebitMesureRepository extends JpaRepository<DebitMesure, Long> {

    List<DebitMesure> findByPompeId(Long pompeId);
}