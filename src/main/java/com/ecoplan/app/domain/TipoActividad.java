package com.ecoplan.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

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

    @NotNull
    @Column(name = "nombre_tipo_actividad", nullable = false, unique = true)
    private String nombreTipoActividad;

    @OneToMany(mappedBy = "tipoActividad")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Actividad> actividads = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Set<Actividad> getActividads() {
        return actividads;
    }

    public TipoActividad actividads(Set<Actividad> actividads) {
        this.actividads = actividads;
        return this;
    }

    public TipoActividad addActividad(Actividad actividad) {
        this.actividads.add(actividad);
        actividad.setTipoActividad(this);
        return this;
    }

    public TipoActividad removeActividad(Actividad actividad) {
        this.actividads.remove(actividad);
        actividad.setTipoActividad(null);
        return this;
    }

    public void setActividads(Set<Actividad> actividads) {
        this.actividads = actividads;
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
            ", nombreTipoActividad='" + getNombreTipoActividad() + "'" +
            "}";
    }
}
