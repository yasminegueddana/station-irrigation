package tn.itbs.irrig.energy.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import tn.itbs.irrig.energy.entity.ConsommationElectrique;

public interface ConsommationElectriqueRepository extends JpaRepository<ConsommationElectrique, Long> {
	
	List<ConsommationElectrique> findByPompeId(Long pompeId);
	List<ConsommationElectrique> findByPompeIdAndDateMesureBetween(
	        Long pompeId,
	        LocalDateTime from,
	        LocalDateTime to);

}
