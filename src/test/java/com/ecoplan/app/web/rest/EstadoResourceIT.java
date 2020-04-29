package com.ecoplan.app.web.rest;

import com.ecoplan.app.EcoplanApp;
import com.ecoplan.app.domain.Estado;
import com.ecoplan.app.repository.EstadoRepository;

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
 * Integration tests for the {@link EstadoResource} REST controller.
 */
@SpringBootTest(classes = EcoplanApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class EstadoResourceIT {

    private static final String DEFAULT_ESTADO_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private EstadoRepository estadoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEstadoMockMvc;

    private Estado estado;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Estado createEntity(EntityManager em) {
        Estado estado = new Estado()
            .estadoNombre(DEFAULT_ESTADO_NOMBRE);
        return estado;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Estado createUpdatedEntity(EntityManager em) {
        Estado estado = new Estado()
            .estadoNombre(UPDATED_ESTADO_NOMBRE);
        return estado;
    }

    @BeforeEach
    public void initTest() {
        estado = createEntity(em);
    }

    @Test
    @Transactional
    public void createEstado() throws Exception {
        int databaseSizeBeforeCreate = estadoRepository.findAll().size();

        // Create the Estado
        restEstadoMockMvc.perform(post("/api/estados")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estado)))
            .andExpect(status().isCreated());

        // Validate the Estado in the database
        List<Estado> estadoList = estadoRepository.findAll();
        assertThat(estadoList).hasSize(databaseSizeBeforeCreate + 1);
        Estado testEstado = estadoList.get(estadoList.size() - 1);
        assertThat(testEstado.getEstadoNombre()).isEqualTo(DEFAULT_ESTADO_NOMBRE);
    }

    @Test
    @Transactional
    public void createEstadoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = estadoRepository.findAll().size();

        // Create the Estado with an existing ID
        estado.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstadoMockMvc.perform(post("/api/estados")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estado)))
            .andExpect(status().isBadRequest());

        // Validate the Estado in the database
        List<Estado> estadoList = estadoRepository.findAll();
        assertThat(estadoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkEstadoNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = estadoRepository.findAll().size();
        // set the field null
        estado.setEstadoNombre(null);

        // Create the Estado, which fails.

        restEstadoMockMvc.perform(post("/api/estados")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estado)))
            .andExpect(status().isBadRequest());

        List<Estado> estadoList = estadoRepository.findAll();
        assertThat(estadoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEstados() throws Exception {
        // Initialize the database
        estadoRepository.saveAndFlush(estado);

        // Get all the estadoList
        restEstadoMockMvc.perform(get("/api/estados?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estado.getId().intValue())))
            .andExpect(jsonPath("$.[*].estadoNombre").value(hasItem(DEFAULT_ESTADO_NOMBRE)));
    }
    
    @Test
    @Transactional
    public void getEstado() throws Exception {
        // Initialize the database
        estadoRepository.saveAndFlush(estado);

        // Get the estado
        restEstadoMockMvc.perform(get("/api/estados/{id}", estado.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(estado.getId().intValue()))
            .andExpect(jsonPath("$.estadoNombre").value(DEFAULT_ESTADO_NOMBRE));
    }

    @Test
    @Transactional
    public void getNonExistingEstado() throws Exception {
        // Get the estado
        restEstadoMockMvc.perform(get("/api/estados/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEstado() throws Exception {
        // Initialize the database
        estadoRepository.saveAndFlush(estado);

        int databaseSizeBeforeUpdate = estadoRepository.findAll().size();

        // Update the estado
        Estado updatedEstado = estadoRepository.findById(estado.getId()).get();
        // Disconnect from session so that the updates on updatedEstado are not directly saved in db
        em.detach(updatedEstado);
        updatedEstado
            .estadoNombre(UPDATED_ESTADO_NOMBRE);

        restEstadoMockMvc.perform(put("/api/estados")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEstado)))
            .andExpect(status().isOk());

        // Validate the Estado in the database
        List<Estado> estadoList = estadoRepository.findAll();
        assertThat(estadoList).hasSize(databaseSizeBeforeUpdate);
        Estado testEstado = estadoList.get(estadoList.size() - 1);
        assertThat(testEstado.getEstadoNombre()).isEqualTo(UPDATED_ESTADO_NOMBRE);
    }

    @Test
    @Transactional
    public void updateNonExistingEstado() throws Exception {
        int databaseSizeBeforeUpdate = estadoRepository.findAll().size();

        // Create the Estado

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstadoMockMvc.perform(put("/api/estados")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estado)))
            .andExpect(status().isBadRequest());

        // Validate the Estado in the database
        List<Estado> estadoList = estadoRepository.findAll();
        assertThat(estadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEstado() throws Exception {
        // Initialize the database
        estadoRepository.saveAndFlush(estado);

        int databaseSizeBeforeDelete = estadoRepository.findAll().size();

        // Delete the estado
        restEstadoMockMvc.perform(delete("/api/estados/{id}", estado.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Estado> estadoList = estadoRepository.findAll();
        assertThat(estadoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
