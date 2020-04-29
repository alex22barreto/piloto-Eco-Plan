package com.ecoplan.app.web.rest;

import com.ecoplan.app.EcoplanApp;
import com.ecoplan.app.domain.Proyecto;
import com.ecoplan.app.repository.ProyectoRepository;

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
 * Integration tests for the {@link ProyectoResource} REST controller.
 */
@SpringBootTest(classes = EcoplanApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ProyectoResourceIT {

    private static final Integer DEFAULT_CODIGO_PROYECTO = 1;
    private static final Integer UPDATED_CODIGO_PROYECTO = 2;

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private ProyectoRepository proyectoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProyectoMockMvc;

    private Proyecto proyecto;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Proyecto createEntity(EntityManager em) {
        Proyecto proyecto = new Proyecto()
            .codigoProyecto(DEFAULT_CODIGO_PROYECTO)
            .nombre(DEFAULT_NOMBRE);
        return proyecto;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Proyecto createUpdatedEntity(EntityManager em) {
        Proyecto proyecto = new Proyecto()
            .codigoProyecto(UPDATED_CODIGO_PROYECTO)
            .nombre(UPDATED_NOMBRE);
        return proyecto;
    }

    @BeforeEach
    public void initTest() {
        proyecto = createEntity(em);
    }

    @Test
    @Transactional
    public void createProyecto() throws Exception {
        int databaseSizeBeforeCreate = proyectoRepository.findAll().size();

        // Create the Proyecto
        restProyectoMockMvc.perform(post("/api/proyectos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(proyecto)))
            .andExpect(status().isCreated());

        // Validate the Proyecto in the database
        List<Proyecto> proyectoList = proyectoRepository.findAll();
        assertThat(proyectoList).hasSize(databaseSizeBeforeCreate + 1);
        Proyecto testProyecto = proyectoList.get(proyectoList.size() - 1);
        assertThat(testProyecto.getCodigoProyecto()).isEqualTo(DEFAULT_CODIGO_PROYECTO);
        assertThat(testProyecto.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    public void createProyectoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = proyectoRepository.findAll().size();

        // Create the Proyecto with an existing ID
        proyecto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProyectoMockMvc.perform(post("/api/proyectos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(proyecto)))
            .andExpect(status().isBadRequest());

        // Validate the Proyecto in the database
        List<Proyecto> proyectoList = proyectoRepository.findAll();
        assertThat(proyectoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCodigoProyectoIsRequired() throws Exception {
        int databaseSizeBeforeTest = proyectoRepository.findAll().size();
        // set the field null
        proyecto.setCodigoProyecto(null);

        // Create the Proyecto, which fails.

        restProyectoMockMvc.perform(post("/api/proyectos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(proyecto)))
            .andExpect(status().isBadRequest());

        List<Proyecto> proyectoList = proyectoRepository.findAll();
        assertThat(proyectoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = proyectoRepository.findAll().size();
        // set the field null
        proyecto.setNombre(null);

        // Create the Proyecto, which fails.

        restProyectoMockMvc.perform(post("/api/proyectos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(proyecto)))
            .andExpect(status().isBadRequest());

        List<Proyecto> proyectoList = proyectoRepository.findAll();
        assertThat(proyectoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProyectos() throws Exception {
        // Initialize the database
        proyectoRepository.saveAndFlush(proyecto);

        // Get all the proyectoList
        restProyectoMockMvc.perform(get("/api/proyectos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(proyecto.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigoProyecto").value(hasItem(DEFAULT_CODIGO_PROYECTO)))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)));
    }
    
    @Test
    @Transactional
    public void getProyecto() throws Exception {
        // Initialize the database
        proyectoRepository.saveAndFlush(proyecto);

        // Get the proyecto
        restProyectoMockMvc.perform(get("/api/proyectos/{id}", proyecto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(proyecto.getId().intValue()))
            .andExpect(jsonPath("$.codigoProyecto").value(DEFAULT_CODIGO_PROYECTO))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE));
    }

    @Test
    @Transactional
    public void getNonExistingProyecto() throws Exception {
        // Get the proyecto
        restProyectoMockMvc.perform(get("/api/proyectos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProyecto() throws Exception {
        // Initialize the database
        proyectoRepository.saveAndFlush(proyecto);

        int databaseSizeBeforeUpdate = proyectoRepository.findAll().size();

        // Update the proyecto
        Proyecto updatedProyecto = proyectoRepository.findById(proyecto.getId()).get();
        // Disconnect from session so that the updates on updatedProyecto are not directly saved in db
        em.detach(updatedProyecto);
        updatedProyecto
            .codigoProyecto(UPDATED_CODIGO_PROYECTO)
            .nombre(UPDATED_NOMBRE);

        restProyectoMockMvc.perform(put("/api/proyectos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProyecto)))
            .andExpect(status().isOk());

        // Validate the Proyecto in the database
        List<Proyecto> proyectoList = proyectoRepository.findAll();
        assertThat(proyectoList).hasSize(databaseSizeBeforeUpdate);
        Proyecto testProyecto = proyectoList.get(proyectoList.size() - 1);
        assertThat(testProyecto.getCodigoProyecto()).isEqualTo(UPDATED_CODIGO_PROYECTO);
        assertThat(testProyecto.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void updateNonExistingProyecto() throws Exception {
        int databaseSizeBeforeUpdate = proyectoRepository.findAll().size();

        // Create the Proyecto

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProyectoMockMvc.perform(put("/api/proyectos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(proyecto)))
            .andExpect(status().isBadRequest());

        // Validate the Proyecto in the database
        List<Proyecto> proyectoList = proyectoRepository.findAll();
        assertThat(proyectoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProyecto() throws Exception {
        // Initialize the database
        proyectoRepository.saveAndFlush(proyecto);

        int databaseSizeBeforeDelete = proyectoRepository.findAll().size();

        // Delete the proyecto
        restProyectoMockMvc.perform(delete("/api/proyectos/{id}", proyecto.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Proyecto> proyectoList = proyectoRepository.findAll();
        assertThat(proyectoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
