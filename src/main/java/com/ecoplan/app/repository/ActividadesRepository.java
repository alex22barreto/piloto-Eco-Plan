package com.ecoplan.app.repository;

import com.ecoplan.app.domain.Actividades;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Actividades entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ActividadesRepository extends JpaRepository<Actividades, Long> {
}
