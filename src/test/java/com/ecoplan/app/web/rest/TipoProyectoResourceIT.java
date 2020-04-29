package com.ecoplan.app.web.rest;

import com.ecoplan.app.EcoplanApp;
import com.ecoplan.app.domain.TipoProyecto;
import com.ecoplan.app.repository.TipoProyectoRepository;

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
 * Integration tests for the {@link TipoProyectoResource} REST controller.
 */
@SpringBootTest(classes = EcoplanApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class TipoProyectoResourceIT {

    private static final String DEFAULT_NOMBRE_TIPO_PROYECTO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_TIPO_PROYECTO = "BBBBBBBBBB";

    @Autowired
    private TipoProyectoRepository tipoProyectoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTipoProyectoMockMvc;

    private TipoProyecto tipoProyecto;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoProyecto createEntity(EntityManager em) {
        TipoProyecto tipoProyecto = new TipoProyecto()
            .nombreTipoProyecto(DEFAULT_NOMBRE_TIPO_PROYECTO);
        return tipoProyecto;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoProyecto createUpdatedEntity(EntityManager em) {
        TipoProyecto tipoProyecto = new TipoProyecto()
            .nombreTipoProyecto(UPDATED_NOMBRE_TIPO_PROYECTO);
        return tipoProyecto;
    }

    @BeforeEach
    public void initTest() {
        tipoProyecto = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoProyecto() throws Exception {
        int databaseSizeBeforeCreate = tipoProyectoRepository.findAll().size();

        // Create the TipoProyecto
        restTipoProyectoMockMvc.perform(post("/api/tipo-proyectos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoProyecto)))
            .andExpect(status().isCreated());

        // Validate the TipoProyecto in the database
        List<TipoProyecto> tipoProyectoList = tipoProyectoRepository.findAll();
        assertThat(tipoProyectoList).hasSize(databaseSizeBeforeCreate + 1);
        TipoProyecto testTipoProyecto = tipoProyectoList.get(tipoProyectoList.size() - 1);
        assertThat(testTipoProyecto.getNombreTipoProyecto()).isEqualTo(DEFAULT_NOMBRE_TIPO_PROYECTO);
    }

    @Test
    @Transactional
    public void createTipoProyectoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoProyectoRepository.findAll().size();

        // Create the TipoProyecto with an existing ID
        tipoProyecto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoProyectoMockMvc.perform(post("/api/tipo-proyectos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoProyecto)))
            .andExpect(status().isBadRequest());

        // Validate the TipoProyecto in the database
        List<TipoProyecto> tipoProyectoList = tipoProyectoRepository.findAll();
        assertThat(tipoProyectoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNombreTipoProyectoIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoProyectoRepository.findAll().size();
        // set the field null
        tipoProyecto.setNombreTipoProyecto(null);

        // Create the TipoProyecto, which fails.

        restTipoProyectoMockMvc.perform(post("/api/tipo-proyectos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoProyecto)))
            .andExpect(status().isBadRequest());

        List<TipoProyecto> tipoProyectoList = tipoProyectoRepository.findAll();
        assertThat(tipoProyectoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTipoProyectos() throws Exception {
        // Initialize the database
        tipoProyectoRepository.saveAndFlush(tipoProyecto);

        // Get all the tipoProyectoList
        restTipoProyectoMockMvc.perform(get("/api/tipo-proyectos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoProyecto.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreTipoProyecto").value(hasItem(DEFAULT_NOMBRE_TIPO_PROYECTO)));
    }
    
    @Test
    @Transactional
    public void getTipoProyecto() throws Exception {
        // Initialize the database
        tipoProyectoRepository.saveAndFlush(tipoProyecto);

        // Get the tipoProyecto
        restTipoProyectoMockMvc.perform(get("/api/tipo-proyectos/{id}", tipoProyecto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tipoProyecto.getId().intValue()))
            .andExpect(jsonPath("$.nombreTipoProyecto").value(DEFAULT_NOMBRE_TIPO_PROYECTO));
    }

    @Test
    @Transactional
    public void getNonExistingTipoProyecto() throws Exception {
        // Get the tipoProyecto
        restTipoProyectoMockMvc.perform(get("/api/tipo-proyectos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoProyecto() throws Exception {
        // Initialize the database
        tipoProyectoRepository.saveAndFlush(tipoProyecto);

        int databaseSizeBeforeUpdate = tipoProyectoRepository.findAll().size();

        // Update the tipoProyecto
        TipoProyecto updatedTipoProyecto = tipoProyectoRepository.findById(tipoProyecto.getId()).get();
        // Disconnect from session so that the updates on updatedTipoProyecto are not directly saved in db
        em.detach(updatedTipoProyecto);
        updatedTipoProyecto
            .nombreTipoProyecto(UPDATED_NOMBRE_TIPO_PROYECTO);

        restTipoProyectoMockMvc.perform(put("/api/tipo-proyectos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoProyecto)))
            .andExpect(status().isOk());

        // Validate the TipoProyecto in the database
        List<TipoProyecto> tipoProyectoList = tipoProyectoRepository.findAll();
        assertThat(tipoProyectoList).hasSize(databaseSizeBeforeUpdate);
        TipoProyecto testTipoProyecto = tipoProyectoList.get(tipoProyectoList.size() - 1);
        assertThat(testTipoProyecto.getNombreTipoProyecto()).isEqualTo(UPDATED_NOMBRE_TIPO_PROYECTO);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoProyecto() throws Exception {
        int databaseSizeBeforeUpdate = tipoProyectoRepository.findAll().size();

        // Create the TipoProyecto

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoProyectoMockMvc.perform(put("/api/tipo-proyectos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoProyecto)))
            .andExpect(status().isBadRequest());

        // Validate the TipoProyecto in the database
        List<TipoProyecto> tipoProyectoList = tipoProyectoRepository.findAll();
        assertThat(tipoProyectoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoProyecto() throws Exception {
        // Initialize the database
        tipoProyectoRepository.saveAndFlush(tipoProyecto);

        int databaseSizeBeforeDelete = tipoProyectoRepository.findAll().size();

        // Delete the tipoProyecto
        restTipoProyectoMockMvc.perform(delete("/api/tipo-proyectos/{id}", tipoProyecto.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoProyecto> tipoProyectoList = tipoProyectoRepository.findAll();
        assertThat(tipoProyectoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
