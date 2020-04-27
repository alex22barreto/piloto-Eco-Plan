package com.ecoplan.app.web.rest;

import com.ecoplan.app.domain.Actividades;
import com.ecoplan.app.repository.ActividadesRepository;
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
 * REST controller for managing {@link com.ecoplan.app.domain.Actividades}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ActividadesResource {

    private final Logger log = LoggerFactory.getLogger(ActividadesResource.class);

    private static final String ENTITY_NAME = "actividades";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ActividadesRepository actividadesRepository;

    public ActividadesResource(ActividadesRepository actividadesRepository) {
        this.actividadesRepository = actividadesRepository;
    }

    /**
     * {@code POST  /actividades} : Create a new actividades.
     *
     * @param actividades the actividades to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new actividades, or with status {@code 400 (Bad Request)} if the actividades has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/actividades")
    public ResponseEntity<Actividades> createActividades(@RequestBody Actividades actividades) throws URISyntaxException {
        log.debug("REST request to save Actividades : {}", actividades);
        if (actividades.getId() != null) {
            throw new BadRequestAlertException("A new actividades cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Actividades result = actividadesRepository.save(actividades);
        return ResponseEntity.created(new URI("/api/actividades/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /actividades} : Updates an existing actividades.
     *
     * @param actividades the actividades to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated actividades,
     * or with status {@code 400 (Bad Request)} if the actividades is not valid,
     * or with status {@code 500 (Internal Server Error)} if the actividades couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/actividades")
    public ResponseEntity<Actividades> updateActividades(@RequestBody Actividades actividades) throws URISyntaxException {
        log.debug("REST request to update Actividades : {}", actividades);
        if (actividades.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Actividades result = actividadesRepository.save(actividades);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, actividades.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /actividades} : get all the actividades.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of actividades in body.
     */
    @GetMapping("/actividades")
    public List<Actividades> getAllActividades() {
        log.debug("REST request to get all Actividades");
        return actividadesRepository.findAll();
    }

    /**
     * {@code GET  /actividades/:id} : get the "id" actividades.
     *
     * @param id the id of the actividades to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the actividades, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/actividades/{id}")
    public ResponseEntity<Actividades> getActividades(@PathVariable Long id) {
        log.debug("REST request to get Actividades : {}", id);
        Optional<Actividades> actividades = actividadesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(actividades);
    }

    /**
     * {@code DELETE  /actividades/:id} : delete the "id" actividades.
     *
     * @param id the id of the actividades to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/actividades/{id}")
    public ResponseEntity<Void> deleteActividades(@PathVariable Long id) {
        log.debug("REST request to delete Actividades : {}", id);
        actividadesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
