package tn.itbs.irrig.water.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import tn.itbs.irrig.water.entity.AlerteEau;

public interface AlerteEauRepository extends JpaRepository<AlerteEau, Long> {
    List<AlerteEau> findByPompeId(Long pompeId);
}
