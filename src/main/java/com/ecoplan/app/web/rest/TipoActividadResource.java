package com.ecoplan.app.web.rest;

import com.ecoplan.app.domain.TipoActividad;
import com.ecoplan.app.repository.TipoActividadRepository;
import com.ecoplan.app.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.ecoplan.app.domain.TipoActividad}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TipoActividadResource {

    private final Logger log = LoggerFactory.getLogger(TipoActividadResource.class);

    private static final String ENTITY_NAME = "tipoActividad";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoActividadRepository tipoActividadRepository;

    public TipoActividadResource(TipoActividadRepository tipoActividadRepository) {
        this.tipoActividadRepository = tipoActividadRepository;
    }

    /**
     * {@code POST  /tipo-actividads} : Create a new tipoActividad.
     *
     * @param tipoActividad the tipoActividad to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoActividad, or with status {@code 400 (Bad Request)} if the tipoActividad has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-actividads")
    public ResponseEntity<TipoActividad> createTipoActividad(@RequestBody TipoActividad tipoActividad) throws URISyntaxException {
        log.debug("REST request to save TipoActividad : {}", tipoActividad);
        if (tipoActividad.getId() != null) {
            throw new BadRequestAlertException("A new tipoActividad cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoActividad result = tipoActividadRepository.save(tipoActividad);
        return ResponseEntity.created(new URI("/api/tipo-actividads/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-actividads} : Updates an existing tipoActividad.
     *
     * @param tipoActividad the tipoActividad to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoActividad,
     * or with status {@code 400 (Bad Request)} if the tipoActividad is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoActividad couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-actividads")
    public ResponseEntity<TipoActividad> updateTipoActividad(@RequestBody TipoActividad tipoActividad) throws URISyntaxException {
        log.debug("REST request to update TipoActividad : {}", tipoActividad);
        if (tipoActividad.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoActividad result = tipoActividadRepository.save(tipoActividad);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoActividad.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-actividads} : get all the tipoActividads.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoActividads in body.
     */
    @GetMapping("/tipo-actividads")
    public List<TipoActividad> getAllTipoActividads() {
        log.debug("REST request to get all TipoActividads");
        return tipoActividadRepository.findAll();
    }

    /**
     * {@code GET  /tipo-actividads/:id} : get the "id" tipoActividad.
     *
     * @param id the id of the tipoActividad to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoActividad, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-actividads/{id}")
    public ResponseEntity<TipoActividad> getTipoActividad(@PathVariable Long id) {
        log.debug("REST request to get TipoActividad : {}", id);
        Optional<TipoActividad> tipoActividad = tipoActividadRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoActividad);
    }

    /**
     * {@code DELETE  /tipo-actividads/:id} : delete the "id" tipoActividad.
     *
     * @param id the id of the tipoActividad to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-actividads/{id}")
    public ResponseEntity<Void> deleteTipoActividad(@PathVariable Long id) {
        log.debug("REST request to delete TipoActividad : {}", id);
        tipoActividadRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
