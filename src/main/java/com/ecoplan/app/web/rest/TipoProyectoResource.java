package com.ecoplan.app.web.rest;

import com.ecoplan.app.domain.TipoProyecto;
import com.ecoplan.app.repository.TipoProyectoRepository;
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
 * REST controller for managing {@link com.ecoplan.app.domain.TipoProyecto}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TipoProyectoResource {

    private final Logger log = LoggerFactory.getLogger(TipoProyectoResource.class);

    private static final String ENTITY_NAME = "tipoProyecto";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoProyectoRepository tipoProyectoRepository;

    public TipoProyectoResource(TipoProyectoRepository tipoProyectoRepository) {
        this.tipoProyectoRepository = tipoProyectoRepository;
    }

    /**
     * {@code POST  /tipo-proyectos} : Create a new tipoProyecto.
     *
     * @param tipoProyecto the tipoProyecto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoProyecto, or with status {@code 400 (Bad Request)} if the tipoProyecto has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-proyectos")
    public ResponseEntity<TipoProyecto> createTipoProyecto(@RequestBody TipoProyecto tipoProyecto) throws URISyntaxException {
        log.debug("REST request to save TipoProyecto : {}", tipoProyecto);
        if (tipoProyecto.getId() != null) {
            throw new BadRequestAlertException("A new tipoProyecto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoProyecto result = tipoProyectoRepository.save(tipoProyecto);
        return ResponseEntity.created(new URI("/api/tipo-proyectos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-proyectos} : Updates an existing tipoProyecto.
     *
     * @param tipoProyecto the tipoProyecto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoProyecto,
     * or with status {@code 400 (Bad Request)} if the tipoProyecto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoProyecto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-proyectos")
    public ResponseEntity<TipoProyecto> updateTipoProyecto(@RequestBody TipoProyecto tipoProyecto) throws URISyntaxException {
        log.debug("REST request to update TipoProyecto : {}", tipoProyecto);
        if (tipoProyecto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoProyecto result = tipoProyectoRepository.save(tipoProyecto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoProyecto.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-proyectos} : get all the tipoProyectos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoProyectos in body.
     */
    @GetMapping("/tipo-proyectos")
    public List<TipoProyecto> getAllTipoProyectos() {
        log.debug("REST request to get all TipoProyectos");
        return tipoProyectoRepository.findAll();
    }

    /**
     * {@code GET  /tipo-proyectos/:id} : get the "id" tipoProyecto.
     *
     * @param id the id of the tipoProyecto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoProyecto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-proyectos/{id}")
    public ResponseEntity<TipoProyecto> getTipoProyecto(@PathVariable Long id) {
        log.debug("REST request to get TipoProyecto : {}", id);
        Optional<TipoProyecto> tipoProyecto = tipoProyectoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoProyecto);
    }

    /**
     * {@code DELETE  /tipo-proyectos/:id} : delete the "id" tipoProyecto.
     *
     * @param id the id of the tipoProyecto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-proyectos/{id}")
    public ResponseEntity<Void> deleteTipoProyecto(@PathVariable Long id) {
        log.debug("REST request to delete TipoProyecto : {}", id);
        tipoProyectoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
