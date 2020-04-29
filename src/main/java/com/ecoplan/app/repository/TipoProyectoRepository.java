package com.ecoplan.app.repository;

import com.ecoplan.app.domain.TipoProyecto;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TipoProyecto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoProyectoRepository extends JpaRepository<TipoProyecto, Long> {
}
