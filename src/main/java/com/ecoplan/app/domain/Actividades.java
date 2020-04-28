package com.ecoplan.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.Instant;

/**
 * A Actividades.
 */
@Entity
@Table(name = "actividades")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Actividades implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "codigo")
    private Integer codigo;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "fec_inicio")
    private Instant fecInicio;

    @Column(name = "fec_fin")
    private Instant fecFin;

    @Column(name = "estado")
    private String estado;

    @Column(name = "tipo")
    private String tipo;

    @Column(name = "con_proveedor")
    private Boolean conProveedor;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCodigo() {
        return codigo;
    }

    public Actividades codigo(Integer codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(Integer codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public Actividades nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Instant getFecInicio() {
        return fecInicio;
    }

    public Actividades fecInicio(Instant fecInicio) {
        this.fecInicio = fecInicio;
        return this;
    }

    public void setFecInicio(Instant fecInicio) {
        this.fecInicio = fecInicio;
    }

    public Instant getFecFin() {
        return fecFin;
    }

    public Actividades fecFin(Instant fecFin) {
        this.fecFin = fecFin;
        return this;
    }

    public void setFecFin(Instant fecFin) {
        this.fecFin = fecFin;
    }

    public String getEstado() {
        return estado;
    }

    public Actividades estado(String estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getTipo() {
        return tipo;
    }

    public Actividades tipo(String tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Boolean isConProveedor() {
        return conProveedor;
    }

    public Actividades conProveedor(Boolean conProveedor) {
        this.conProveedor = conProveedor;
        return this;
    }

    public void setConProveedor(Boolean conProveedor) {
        this.conProveedor = conProveedor;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Actividades)) {
            return false;
        }
        return id != null && id.equals(((Actividades) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Actividades{" +
            "id=" + getId() +
            ", codigo=" + getCodigo() +
            ", nombre='" + getNombre() + "'" +
            ", fecInicio='" + getFecInicio() + "'" +
            ", fecFin='" + getFecFin() + "'" +
            ", estado='" + getEstado() + "'" +
            ", tipo='" + getTipo() + "'" +
            ", conProveedor='" + isConProveedor() + "'" +
            "}";
    }
}