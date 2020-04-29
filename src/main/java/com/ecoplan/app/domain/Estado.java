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
 * A Estado.
 */
@Entity
@Table(name = "estado")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Estado implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "estado_nombre", nullable = false, unique = true)
    private String estadoNombre;

    @OneToMany(mappedBy = "estado")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Proyecto> proyectos = new HashSet<>();

    @OneToMany(mappedBy = "estado")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Actividad> actividads = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEstadoNombre() {
        return estadoNombre;
    }

    public Estado estadoNombre(String estadoNombre) {
        this.estadoNombre = estadoNombre;
        return this;
    }

    public void setEstadoNombre(String estadoNombre) {
        this.estadoNombre = estadoNombre;
    }

    public Set<Proyecto> getProyectos() {
        return proyectos;
    }

    public Estado proyectos(Set<Proyecto> proyectos) {
        this.proyectos = proyectos;
        return this;
    }

    public Estado addProyecto(Proyecto proyecto) {
        this.proyectos.add(proyecto);
        proyecto.setEstado(this);
        return this;
    }

    public Estado removeProyecto(Proyecto proyecto) {
        this.proyectos.remove(proyecto);
        proyecto.setEstado(null);
        return this;
    }

    public void setProyectos(Set<Proyecto> proyectos) {
        this.proyectos = proyectos;
    }

    public Set<Actividad> getActividads() {
        return actividads;
    }

    public Estado actividads(Set<Actividad> actividads) {
        this.actividads = actividads;
        return this;
    }

    public Estado addActividad(Actividad actividad) {
        this.actividads.add(actividad);
        actividad.setEstado(this);
        return this;
    }

    public Estado removeActividad(Actividad actividad) {
        this.actividads.remove(actividad);
        actividad.setEstado(null);
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
        if (!(o instanceof Estado)) {
            return false;
        }
        return id != null && id.equals(((Estado) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Estado{" +
            "id=" + getId() +
            ", estadoNombre='" + getEstadoNombre() + "'" +
            "}";
    }
}
