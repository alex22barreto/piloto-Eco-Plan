package com.ecoplan.app.web.rest;

import com.ecoplan.app.EcoplanApp;
import com.ecoplan.app.domain.Actividad;
import com.ecoplan.app.repository.ActividadRepository;

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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ActividadResource} REST controller.
 */
@SpringBootTest(classes = EcoplanApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ActividadResourceIT {

    private static final Integer DEFAULT_CODIGO_ACTIVIDAD = 1;
    private static final Integer UPDATED_CODIGO_ACTIVIDAD = 2;

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final Instant DEFAULT_FEC_INICIO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FEC_INICIO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_FEC_FIN = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FEC_FIN = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Boolean DEFAULT_CON_PROVEEDOR = false;
    private static final Boolean UPDATED_CON_PROVEEDOR = true;

    @Autowired
    private ActividadRepository actividadRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restActividadMockMvc;

    private Actividad actividad;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Actividad createEntity(EntityManager em) {
        Actividad actividad = new Actividad()
            .codigoActividad(DEFAULT_CODIGO_ACTIVIDAD)
            .nombre(DEFAULT_NOMBRE)
            .fecInicio(DEFAULT_FEC_INICIO)
            .fecFin(DEFAULT_FEC_FIN)
            .conProveedor(DEFAULT_CON_PROVEEDOR);
        return actividad;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Actividad createUpdatedEntity(EntityManager em) {
        Actividad actividad = new Actividad()
            .codigoActividad(UPDATED_CODIGO_ACTIVIDAD)
            .nombre(UPDATED_NOMBRE)
            .fecInicio(UPDATED_FEC_INICIO)
            .fecFin(UPDATED_FEC_FIN)
            .conProveedor(UPDATED_CON_PROVEEDOR);
        return actividad;
    }

    @BeforeEach
    public void initTest() {
        actividad = createEntity(em);
    }

    @Test
    @Transactional
    public void createActividad() throws Exception {
        int databaseSizeBeforeCreate = actividadRepository.findAll().size();

        // Create the Actividad
        restActividadMockMvc.perform(post("/api/actividads")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(actividad)))
            .andExpect(status().isCreated());

        // Validate the Actividad in the database
        List<Actividad> actividadList = actividadRepository.findAll();
        assertThat(actividadList).hasSize(databaseSizeBeforeCreate + 1);
        Actividad testActividad = actividadList.get(actividadList.size() - 1);
        assertThat(testActividad.getCodigoActividad()).isEqualTo(DEFAULT_CODIGO_ACTIVIDAD);
        assertThat(testActividad.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testActividad.getFecInicio()).isEqualTo(DEFAULT_FEC_INICIO);
        assertThat(testActividad.getFecFin()).isEqualTo(DEFAULT_FEC_FIN);
        assertThat(testActividad.isConProveedor()).isEqualTo(DEFAULT_CON_PROVEEDOR);
    }

    @Test
    @Transactional
    public void createActividadWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = actividadRepository.findAll().size();

        // Create the Actividad with an existing ID
        actividad.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restActividadMockMvc.perform(post("/api/actividads")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(actividad)))
            .andExpect(status().isBadRequest());

        // Validate the Actividad in the database
        List<Actividad> actividadList = actividadRepository.findAll();
        assertThat(actividadList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCodigoActividadIsRequired() throws Exception {
        int databaseSizeBeforeTest = actividadRepository.findAll().size();
        // set the field null
        actividad.setCodigoActividad(null);

        // Create the Actividad, which fails.

        restActividadMockMvc.perform(post("/api/actividads")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(actividad)))
            .andExpect(status().isBadRequest());

        List<Actividad> actividadList = actividadRepository.findAll();
        assertThat(actividadList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = actividadRepository.findAll().size();
        // set the field null
        actividad.setNombre(null);

        // Create the Actividad, which fails.

        restActividadMockMvc.perform(post("/api/actividads")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(actividad)))
            .andExpect(status().isBadRequest());

        List<Actividad> actividadList = actividadRepository.findAll();
        assertThat(actividadList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFecInicioIsRequired() throws Exception {
        int databaseSizeBeforeTest = actividadRepository.findAll().size();
        // set the field null
        actividad.setFecInicio(null);

        // Create the Actividad, which fails.

        restActividadMockMvc.perform(post("/api/actividads")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(actividad)))
            .andExpect(status().isBadRequest());

        List<Actividad> actividadList = actividadRepository.findAll();
        assertThat(actividadList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFecFinIsRequired() throws Exception {
        int databaseSizeBeforeTest = actividadRepository.findAll().size();
        // set the field null
        actividad.setFecFin(null);

        // Create the Actividad, which fails.

        restActividadMockMvc.perform(post("/api/actividads")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(actividad)))
            .andExpect(status().isBadRequest());

        List<Actividad> actividadList = actividadRepository.findAll();
        assertThat(actividadList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkConProveedorIsRequired() throws Exception {
        int databaseSizeBeforeTest = actividadRepository.findAll().size();
        // set the field null
        actividad.setConProveedor(null);

        // Create the Actividad, which fails.

        restActividadMockMvc.perform(post("/api/actividads")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(actividad)))
            .andExpect(status().isBadRequest());

        List<Actividad> actividadList = actividadRepository.findAll();
        assertThat(actividadList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllActividads() throws Exception {
        // Initialize the database
        actividadRepository.saveAndFlush(actividad);

        // Get all the actividadList
        restActividadMockMvc.perform(get("/api/actividads?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(actividad.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigoActividad").value(hasItem(DEFAULT_CODIGO_ACTIVIDAD)))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].fecInicio").value(hasItem(DEFAULT_FEC_INICIO.toString())))
            .andExpect(jsonPath("$.[*].fecFin").value(hasItem(DEFAULT_FEC_FIN.toString())))
            .andExpect(jsonPath("$.[*].conProveedor").value(hasItem(DEFAULT_CON_PROVEEDOR.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getActividad() throws Exception {
        // Initialize the database
        actividadRepository.saveAndFlush(actividad);

        // Get the actividad
        restActividadMockMvc.perform(get("/api/actividads/{id}", actividad.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(actividad.getId().intValue()))
            .andExpect(jsonPath("$.codigoActividad").value(DEFAULT_CODIGO_ACTIVIDAD))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.fecInicio").value(DEFAULT_FEC_INICIO.toString()))
            .andExpect(jsonPath("$.fecFin").value(DEFAULT_FEC_FIN.toString()))
            .andExpect(jsonPath("$.conProveedor").value(DEFAULT_CON_PROVEEDOR.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingActividad() throws Exception {
        // Get the actividad
        restActividadMockMvc.perform(get("/api/actividads/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateActividad() throws Exception {
        // Initialize the database
        actividadRepository.saveAndFlush(actividad);

        int databaseSizeBeforeUpdate = actividadRepository.findAll().size();

        // Update the actividad
        Actividad updatedActividad = actividadRepository.findById(actividad.getId()).get();
        // Disconnect from session so that the updates on updatedActividad are not directly saved in db
        em.detach(updatedActividad);
        updatedActividad
            .codigoActividad(UPDATED_CODIGO_ACTIVIDAD)
            .nombre(UPDATED_NOMBRE)
            .fecInicio(UPDATED_FEC_INICIO)
            .fecFin(UPDATED_FEC_FIN)
            .conProveedor(UPDATED_CON_PROVEEDOR);

        restActividadMockMvc.perform(put("/api/actividads")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedActividad)))
            .andExpect(status().isOk());

        // Validate the Actividad in the database
        List<Actividad> actividadList = actividadRepository.findAll();
        assertThat(actividadList).hasSize(databaseSizeBeforeUpdate);
        Actividad testActividad = actividadList.get(actividadList.size() - 1);
        assertThat(testActividad.getCodigoActividad()).isEqualTo(UPDATED_CODIGO_ACTIVIDAD);
        assertThat(testActividad.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testActividad.getFecInicio()).isEqualTo(UPDATED_FEC_INICIO);
        assertThat(testActividad.getFecFin()).isEqualTo(UPDATED_FEC_FIN);
        assertThat(testActividad.isConProveedor()).isEqualTo(UPDATED_CON_PROVEEDOR);
    }

    @Test
    @Transactional
    public void updateNonExistingActividad() throws Exception {
        int databaseSizeBeforeUpdate = actividadRepository.findAll().size();

        // Create the Actividad

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restActividadMockMvc.perform(put("/api/actividads")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(actividad)))
            .andExpect(status().isBadRequest());

        // Validate the Actividad in the database
        List<Actividad> actividadList = actividadRepository.findAll();
        assertThat(actividadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteActividad() throws Exception {
        // Initialize the database
        actividadRepository.saveAndFlush(actividad);

        int databaseSizeBeforeDelete = actividadRepository.findAll().size();

        // Delete the actividad
        restActividadMockMvc.perform(delete("/api/actividads/{id}", actividad.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Actividad> actividadList = actividadRepository.findAll();
        assertThat(actividadList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
