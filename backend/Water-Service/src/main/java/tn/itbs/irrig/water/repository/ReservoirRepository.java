package tn.itbs.irrig.water.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tn.itbs.irrig.water.entity.Reservoir;

public interface ReservoirRepository extends JpaRepository<Reservoir, Long> {
}