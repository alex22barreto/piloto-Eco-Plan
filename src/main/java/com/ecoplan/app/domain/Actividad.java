package com.ecoplan.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.Instant;

/**
 * A Actividad.
 */
@Entity
@Table(name = "actividad")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Actividad implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "codigo_actividad", nullable = false, unique = true)
    private Integer codigoActividad;

    @NotNull
    @Column(name = "nombre", nullable = false)
    private String nombre;

    @NotNull
    @Column(name = "fec_inicio", nullable = false)
    private Instant fecInicio;

    @NotNull
    @Column(name = "fec_fin", nullable = false)
    private Instant fecFin;

    @NotNull
    @Column(name = "con_proveedor", nullable = false)
    private Boolean conProveedor;

    @ManyToOne
    @JsonIgnoreProperties("actividads")
    private Proyecto proyecto;

    @ManyToOne
    @JsonIgnoreProperties("actividads")
    private TipoActividad tipoActividad;

    @ManyToOne
    @JsonIgnoreProperties("actividads")
    private Estado estado;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCodigoActividad() {
        return codigoActividad;
    }

    public Actividad codigoActividad(Integer codigoActividad) {
        this.codigoActividad = codigoActividad;
        return this;
    }

    public void setCodigoActividad(Integer codigoActividad) {
        this.codigoActividad = codigoActividad;
    }

    public String getNombre() {
        return nombre;
    }

    public Actividad nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Instant getFecInicio() {
        return fecInicio;
    }

    public Actividad fecInicio(Instant fecInicio) {
        this.fecInicio = fecInicio;
        return this;
    }

    public void setFecInicio(Instant fecInicio) {
        this.fecInicio = fecInicio;
    }

    public Instant getFecFin() {
        return fecFin;
    }

    public Actividad fecFin(Instant fecFin) {
        this.fecFin = fecFin;
        return this;
    }

    public void setFecFin(Instant fecFin) {
        this.fecFin = fecFin;
    }

    public Boolean isConProveedor() {
        return conProveedor;
    }

    public Actividad conProveedor(Boolean conProveedor) {
        this.conProveedor = conProveedor;
        return this;
    }

    public void setConProveedor(Boolean conProveedor) {
        this.conProveedor = conProveedor;
    }

    public Proyecto getProyecto() {
        return proyecto;
    }

    public Actividad proyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
        return this;
    }

    public void setProyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
    }

    public TipoActividad getTipoActividad() {
        return tipoActividad;
    }

    public Actividad tipoActividad(TipoActividad tipoActividad) {
        this.tipoActividad = tipoActividad;
        return this;
    }

    public void setTipoActividad(TipoActividad tipoActividad) {
        this.tipoActividad = tipoActividad;
    }

    public Estado getEstado() {
        return estado;
    }

    public Actividad estado(Estado estado) {
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
        if (!(o instanceof Actividad)) {
            return false;
        }
        return id != null && id.equals(((Actividad) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Actividad{" +
            "id=" + getId() +
            ", codigoActividad=" + getCodigoActividad() +
            ", nombre='" + getNombre() + "'" +
            ", fecInicio='" + getFecInicio() + "'" +
            ", fecFin='" + getFecFin() + "'" +
            ", conProveedor='" + isConProveedor() + "'" +
            "}";
    }
}
