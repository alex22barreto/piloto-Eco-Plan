package com.ecoplan.app.web.rest;

import com.ecoplan.app.EcoplanApp;
import com.ecoplan.app.domain.TipoActividad;
import com.ecoplan.app.repository.TipoActividadRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TipoActividadResource} REST controller.
 */
@SpringBootTest(classes = EcoplanApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class TipoActividadResourceIT {

    private static final String DEFAULT_NOMBRE_TIPO_ACTIVIDAD = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_TIPO_ACTIVIDAD = "BBBBBBBBBB";

    @Autowired
    private TipoActividadRepository tipoActividadRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTipoActividadMockMvc;

    private TipoActividad tipoActividad;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoActividad createEntity(EntityManager em) {
        TipoActividad tipoActividad = new TipoActividad()
            .nombreTipoActividad(DEFAULT_NOMBRE_TIPO_ACTIVIDAD);
        return tipoActividad;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoActividad createUpdatedEntity(EntityManager em) {
        TipoActividad tipoActividad = new TipoActividad()
            .nombreTipoActividad(UPDATED_NOMBRE_TIPO_ACTIVIDAD);
        return tipoActividad;
    }

    @BeforeEach
    public void initTest() {
        tipoActividad = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoActividad() throws Exception {
        int databaseSizeBeforeCreate = tipoActividadRepository.findAll().size();

        // Create the TipoActividad
        restTipoActividadMockMvc.perform(post("/api/tipo-actividads")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoActividad)))
            .andExpect(status().isCreated());

        // Validate the TipoActividad in the database
        List<TipoActividad> tipoActividadList = tipoActividadRepository.findAll();
        assertThat(tipoActividadList).hasSize(databaseSizeBeforeCreate + 1);
        TipoActividad testTipoActividad = tipoActividadList.get(tipoActividadList.size() - 1);
        assertThat(testTipoActividad.getNombreTipoActividad()).isEqualTo(DEFAULT_NOMBRE_TIPO_ACTIVIDAD);
    }

    @Test
    @Transactional
    public void createTipoActividadWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoActividadRepository.findAll().size();

        // Create the TipoActividad with an existing ID
        tipoActividad.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoActividadMockMvc.perform(post("/api/tipo-actividads")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoActividad)))
            .andExpect(status().isBadRequest());

        // Validate the TipoActividad in the database
        List<TipoActividad> tipoActividadList = tipoActividadRepository.findAll();
        assertThat(tipoActividadList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNombreTipoActividadIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoActividadRepository.findAll().size();
        // set the field null
        tipoActividad.setNombreTipoActividad(null);

        // Create the TipoActividad, which fails.

        restTipoActividadMockMvc.perform(post("/api/tipo-actividads")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoActividad)))
            .andExpect(status().isBadRequest());

        List<TipoActividad> tipoActividadList = tipoActividadRepository.findAll();
        assertThat(tipoActividadList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTipoActividads() throws Exception {
        // Initialize the database
        tipoActividadRepository.saveAndFlush(tipoActividad);

        // Get all the tipoActividadList
        restTipoActividadMockMvc.perform(get("/api/tipo-actividads?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoActividad.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreTipoActividad").value(hasItem(DEFAULT_NOMBRE_TIPO_ACTIVIDAD)));
    }
    
    @Test
    @Transactional
    public void getTipoActividad() throws Exception {
        // Initialize the database
        tipoActividadRepository.saveAndFlush(tipoActividad);

        // Get the tipoActividad
        restTipoActividadMockMvc.perform(get("/api/tipo-actividads/{id}", tipoActividad.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tipoActividad.getId().intValue()))
            .andExpect(jsonPath("$.nombreTipoActividad").value(DEFAULT_NOMBRE_TIPO_ACTIVIDAD));
    }

    @Test
    @Transactional
    public void getNonExistingTipoActividad() throws Exception {
        // Get the tipoActividad
        restTipoActividadMockMvc.perform(get("/api/tipo-actividads/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoActividad() throws Exception {
        // Initialize the database
        tipoActividadRepository.saveAndFlush(tipoActividad);

        int databaseSizeBeforeUpdate = tipoActividadRepository.findAll().size();

        // Update the tipoActividad
        TipoActividad updatedTipoActividad = tipoActividadRepository.findById(tipoActividad.getId()).get();
        // Disconnect from session so that the updates on updatedTipoActividad are not directly saved in db
        em.detach(updatedTipoActividad);
        updatedTipoActividad
            .nombreTipoActividad(UPDATED_NOMBRE_TIPO_ACTIVIDAD);

        restTipoActividadMockMvc.perform(put("/api/tipo-actividads")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoActividad)))
            .andExpect(status().isOk());

        // Validate the TipoActividad in the database
        List<TipoActividad> tipoActividadList = tipoActividadRepository.findAll();
        assertThat(tipoActividadList).hasSize(databaseSizeBeforeUpdate);
        TipoActividad testTipoActividad = tipoActividadList.get(tipoActividadList.size() - 1);
        assertThat(testTipoActividad.getNombreTipoActividad()).isEqualTo(UPDATED_NOMBRE_TIPO_ACTIVIDAD);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoActividad() throws Exception {
        int databaseSizeBeforeUpdate = tipoActividadRepository.findAll().size();

        // Create the TipoActividad

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoActividadMockMvc.perform(put("/api/tipo-actividads")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoActividad)))
            .andExpect(status().isBadRequest());

        // Validate the TipoActividad in the database
        List<TipoActividad> tipoActividadList = tipoActividadRepository.findAll();
        assertThat(tipoActividadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoActividad() throws Exception {
        // Initialize the database
        tipoActividadRepository.saveAndFlush(tipoActividad);

        int databaseSizeBeforeDelete = tipoActividadRepository.findAll().size();

        // Delete the tipoActividad
        restTipoActividadMockMvc.perform(delete("/api/tipo-actividads/{id}", tipoActividad.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoActividad> tipoActividadList = tipoActividadRepository.findAll();
        assertThat(tipoActividadList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
