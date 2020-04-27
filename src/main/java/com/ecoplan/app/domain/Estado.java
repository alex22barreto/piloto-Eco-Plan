package com.ecoplan.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

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

    @Column(name = "id_tipo_estado")
    private Integer idTipoEstado;

    @Column(name = "nombre_tipo_estado")
    private String nombreTipoEstado;

    @OneToMany(mappedBy = "estado")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Actividades> actividades = new HashSet<>();

    @OneToMany(mappedBy = "estado")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Proyecto> proyectos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdTipoEstado() {
        return idTipoEstado;
    }

    public Estado idTipoEstado(Integer idTipoEstado) {
        this.idTipoEstado = idTipoEstado;
        return this;
    }

    public void setIdTipoEstado(Integer idTipoEstado) {
        this.idTipoEstado = idTipoEstado;
    }

    public String getNombreTipoEstado() {
        return nombreTipoEstado;
    }

    public Estado nombreTipoEstado(String nombreTipoEstado) {
        this.nombreTipoEstado = nombreTipoEstado;
        return this;
    }

    public void setNombreTipoEstado(String nombreTipoEstado) {
        this.nombreTipoEstado = nombreTipoEstado;
    }

    public Set<Actividades> getActividades() {
        return actividades;
    }

    public Estado actividades(Set<Actividades> actividades) {
        this.actividades = actividades;
        return this;
    }

    public Estado addActividades(Actividades actividades) {
        this.actividades.add(actividades);
        actividades.setEstado(this);
        return this;
    }

    public Estado removeActividades(Actividades actividades) {
        this.actividades.remove(actividades);
        actividades.setEstado(null);
        return this;
    }

    public void setActividades(Set<Actividades> actividades) {
        this.actividades = actividades;
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
            ", idTipoEstado=" + getIdTipoEstado() +
            ", nombreTipoEstado='" + getNombreTipoEstado() + "'" +
            "}";
    }
}
