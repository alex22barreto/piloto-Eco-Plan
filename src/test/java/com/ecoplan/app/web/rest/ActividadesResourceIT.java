package com.ecoplan.app.web.rest;

import com.ecoplan.app.EcoplanApp;
import com.ecoplan.app.domain.Actividades;
import com.ecoplan.app.repository.ActividadesRepository;

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
 * Integration tests for the {@link ActividadesResource} REST controller.
 */
@SpringBootTest(classes = EcoplanApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ActividadesResourceIT {

    private static final Integer DEFAULT_CODIGO = 1;
    private static final Integer UPDATED_CODIGO = 2;

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final Instant DEFAULT_FEC_INICIO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FEC_INICIO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_FEC_FIN = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FEC_FIN = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO = "BBBBBBBBBB";

    private static final String DEFAULT_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO = "BBBBBBBBBB";

    private static final Boolean DEFAULT_CON_PROVEEDOR = false;
    private static final Boolean UPDATED_CON_PROVEEDOR = true;

    @Autowired
    private ActividadesRepository actividadesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restActividadesMockMvc;

    private Actividades actividades;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Actividades createEntity(EntityManager em) {
        Actividades actividades = new Actividades()
            .codigo(DEFAULT_CODIGO)
            .nombre(DEFAULT_NOMBRE)
            .fecInicio(DEFAULT_FEC_INICIO)
            .fecFin(DEFAULT_FEC_FIN)
            .estado(DEFAULT_ESTADO)
            .tipo(DEFAULT_TIPO)
            .conProveedor(DEFAULT_CON_PROVEEDOR);
        return actividades;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Actividades createUpdatedEntity(EntityManager em) {
        Actividades actividades = new Actividades()
            .codigo(UPDATED_CODIGO)
            .nombre(UPDATED_NOMBRE)
            .fecInicio(UPDATED_FEC_INICIO)
            .fecFin(UPDATED_FEC_FIN)
            .estado(UPDATED_ESTADO)
            .tipo(UPDATED_TIPO)
            .conProveedor(UPDATED_CON_PROVEEDOR);
        return actividades;
    }

    @BeforeEach
    public void initTest() {
        actividades = createEntity(em);
    }

    @Test
    @Transactional
    public void createActividades() throws Exception {
        int databaseSizeBeforeCreate = actividadesRepository.findAll().size();

        // Create the Actividades
        restActividadesMockMvc.perform(post("/api/actividades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(actividades)))
            .andExpect(status().isCreated());

        // Validate the Actividades in the database
        List<Actividades> actividadesList = actividadesRepository.findAll();
        assertThat(actividadesList).hasSize(databaseSizeBeforeCreate + 1);
        Actividades testActividades = actividadesList.get(actividadesList.size() - 1);
        assertThat(testActividades.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testActividades.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testActividades.getFecInicio()).isEqualTo(DEFAULT_FEC_INICIO);
        assertThat(testActividades.getFecFin()).isEqualTo(DEFAULT_FEC_FIN);
        assertThat(testActividades.getEstado()).isEqualTo(DEFAULT_ESTADO);
        assertThat(testActividades.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testActividades.isConProveedor()).isEqualTo(DEFAULT_CON_PROVEEDOR);
    }

    @Test
    @Transactional
    public void createActividadesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = actividadesRepository.findAll().size();

        // Create the Actividades with an existing ID
        actividades.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restActividadesMockMvc.perform(post("/api/actividades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(actividades)))
            .andExpect(status().isBadRequest());

        // Validate the Actividades in the database
        List<Actividades> actividadesList = actividadesRepository.findAll();
        assertThat(actividadesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllActividades() throws Exception {
        // Initialize the database
        actividadesRepository.saveAndFlush(actividades);

        // Get all the actividadesList
        restActividadesMockMvc.perform(get("/api/actividades?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(actividades.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO)))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].fecInicio").value(hasItem(DEFAULT_FEC_INICIO.toString())))
            .andExpect(jsonPath("$.[*].fecFin").value(hasItem(DEFAULT_FEC_FIN.toString())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO)))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO)))
            .andExpect(jsonPath("$.[*].conProveedor").value(hasItem(DEFAULT_CON_PROVEEDOR.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getActividades() throws Exception {
        // Initialize the database
        actividadesRepository.saveAndFlush(actividades);

        // Get the actividades
        restActividadesMockMvc.perform(get("/api/actividades/{id}", actividades.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(actividades.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.fecInicio").value(DEFAULT_FEC_INICIO.toString()))
            .andExpect(jsonPath("$.fecFin").value(DEFAULT_FEC_FIN.toString()))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO))
            .andExpect(jsonPath("$.conProveedor").value(DEFAULT_CON_PROVEEDOR.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingActividades() throws Exception {
        // Get the actividades
        restActividadesMockMvc.perform(get("/api/actividades/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateActividades() throws Exception {
        // Initialize the database
        actividadesRepository.saveAndFlush(actividades);

        int databaseSizeBeforeUpdate = actividadesRepository.findAll().size();

        // Update the actividades
        Actividades updatedActividades = actividadesRepository.findById(actividades.getId()).get();
        // Disconnect from session so that the updates on updatedActividades are not directly saved in db
        em.detach(updatedActividades);
        updatedActividades
            .codigo(UPDATED_CODIGO)
            .nombre(UPDATED_NOMBRE)
            .fecInicio(UPDATED_FEC_INICIO)
            .fecFin(UPDATED_FEC_FIN)
            .estado(UPDATED_ESTADO)
            .tipo(UPDATED_TIPO)
            .conProveedor(UPDATED_CON_PROVEEDOR);

        restActividadesMockMvc.perform(put("/api/actividades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedActividades)))
            .andExpect(status().isOk());

        // Validate the Actividades in the database
        List<Actividades> actividadesList = actividadesRepository.findAll();
        assertThat(actividadesList).hasSize(databaseSizeBeforeUpdate);
        Actividades testActividades = actividadesList.get(actividadesList.size() - 1);
        assertThat(testActividades.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testActividades.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testActividades.getFecInicio()).isEqualTo(UPDATED_FEC_INICIO);
        assertThat(testActividades.getFecFin()).isEqualTo(UPDATED_FEC_FIN);
        assertThat(testActividades.getEstado()).isEqualTo(UPDATED_ESTADO);
        assertThat(testActividades.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testActividades.isConProveedor()).isEqualTo(UPDATED_CON_PROVEEDOR);
    }

    @Test
    @Transactional
    public void updateNonExistingActividades() throws Exception {
        int databaseSizeBeforeUpdate = actividadesRepository.findAll().size();

        // Create the Actividades

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restActividadesMockMvc.perform(put("/api/actividades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(actividades)))
            .andExpect(status().isBadRequest());

        // Validate the Actividades in the database
        List<Actividades> actividadesList = actividadesRepository.findAll();
        assertThat(actividadesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteActividades() throws Exception {
        // Initialize the database
        actividadesRepository.saveAndFlush(actividades);

        int databaseSizeBeforeDelete = actividadesRepository.findAll().size();

        // Delete the actividades
        restActividadesMockMvc.perform(delete("/api/actividades/{id}", actividades.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Actividades> actividadesList = actividadesRepository.findAll();
        assertThat(actividadesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
