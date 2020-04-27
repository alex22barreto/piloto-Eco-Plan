package com.ecoplan.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A TipoActividad.
 */
@Entity
@Table(name = "tipo_actividad")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TipoActividad implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_tipo_actividad")
    private Integer idTipoActividad;

    @Column(name = "nombre_tipo_actividad")
    private String nombreTipoActividad;

    @OneToMany(mappedBy = "tipo")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Actividades> actividades = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdTipoActividad() {
        return idTipoActividad;
    }

    public TipoActividad idTipoActividad(Integer idTipoActividad) {
        this.idTipoActividad = idTipoActividad;
        return this;
    }

    public void setIdTipoActividad(Integer idTipoActividad) {
        this.idTipoActividad = idTipoActividad;
    }

    public String getNombreTipoActividad() {
        return nombreTipoActividad;
    }

    public TipoActividad nombreTipoActividad(String nombreTipoActividad) {
        this.nombreTipoActividad = nombreTipoActividad;
        return this;
    }

    public void setNombreTipoActividad(String nombreTipoActividad) {
        this.nombreTipoActividad = nombreTipoActividad;
    }

    public Set<Actividades> getActividades() {
        return actividades;
    }

    public TipoActividad actividades(Set<Actividades> actividades) {
        this.actividades = actividades;
        return this;
    }

    public TipoActividad addActividades(Actividades actividades) {
        this.actividades.add(actividades);
        actividades.setTipo(this);
        return this;
    }

    public TipoActividad removeActividades(Actividades actividades) {
        this.actividades.remove(actividades);
        actividades.setTipo(null);
        return this;
    }

    public void setActividades(Set<Actividades> actividades) {
        this.actividades = actividades;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoActividad)) {
            return false;
        }
        return id != null && id.equals(((TipoActividad) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TipoActividad{" +
            "id=" + getId() +
            ", idTipoActividad=" + getIdTipoActividad() +
            ", nombreTipoActividad='" + getNombreTipoActividad() + "'" +
            "}";
    }
}
