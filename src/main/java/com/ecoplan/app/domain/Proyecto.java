package com.ecoplan.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A Proyecto.
 */
@Entity
@Table(name = "proyecto")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Proyecto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "codigo_proyecto", nullable = false, unique = true)
    private Integer codigoProyecto;

    @NotNull
    @Column(name = "nombre", nullable = false)
    private String nombre;

    @OneToMany(mappedBy = "proyecto")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Actividad> actividads = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("proyectos")
    private Empresa empresa;

    @ManyToOne
    @JsonIgnoreProperties("proyectos")
    private TipoProyecto tipoProyecto;

    @ManyToOne
    @JsonIgnoreProperties("proyectos")
    private Estado estado;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCodigoProyecto() {
        return codigoProyecto;
    }

    public Proyecto codigoProyecto(Integer codigoProyecto) {
        this.codigoProyecto = codigoProyecto;
        return this;
    }

    public void setCodigoProyecto(Integer codigoProyecto) {
        this.codigoProyecto = codigoProyecto;
    }

    public String getNombre() {
        return nombre;
    }

    public Proyecto nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Set<Actividad> getActividads() {
        return actividads;
    }

    public Proyecto actividads(Set<Actividad> actividads) {
        this.actividads = actividads;
        return this;
    }

    public Proyecto addActividad(Actividad actividad) {
        this.actividads.add(actividad);
        actividad.setProyecto(this);
        return this;
    }

    public Proyecto removeActividad(Actividad actividad) {
        this.actividads.remove(actividad);
        actividad.setProyecto(null);
        return this;
    }

    public void setActividads(Set<Actividad> actividads) {
        this.actividads = actividads;
    }

    public Empresa getEmpresa() {
        return empresa;
    }

    public Proyecto empresa(Empresa empresa) {
        this.empresa = empresa;
        return this;
    }

    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }

    public TipoProyecto getTipoProyecto() {
        return tipoProyecto;
    }

    public Proyecto tipoProyecto(TipoProyecto tipoProyecto) {
        this.tipoProyecto = tipoProyecto;
        return this;
    }

    public void setTipoProyecto(TipoProyecto tipoProyecto) {
        this.tipoProyecto = tipoProyecto;
    }

    public Estado getEstado() {
        return estado;
    }

    public Proyecto estado(Estado estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Proyecto)) {
            return false;
        }
        return id != null && id.equals(((Proyecto) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Proyecto{" +
            "id=" + getId() +
            ", codigoProyecto=" + getCodigoProyecto() +
            ", nombre='" + getNombre() + "'" +
            "}";
    }
}
