package tn.itbs.irrig.energy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tn.itbs.irrig.energy.entity.Pompe;

public interface PompeRepository extends JpaRepository<Pompe, Long>  {
	Pompe findByReference(String reference);

}
