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
 * A Empresa.
 */
@Entity
@Table(name = "empresa")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Empresa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "tipo_ident", nullable = false)
    private String tipoIdent;

    @NotNull
    @Column(name = "identificacion_empresa", nullable = false, unique = true)
    private String identificacionEmpresa;

    @NotNull
    @Column(name = "razon_social", nullable = false)
    private String razonSocial;

    @NotNull
    @Column(name = "celular", nullable = false)
    private Integer celular;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @OneToMany(mappedBy = "empresa")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Proyecto> proyectos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipoIdent() {
        return tipoIdent;
    }

    public Empresa tipoIdent(String tipoIdent) {
        this.tipoIdent = tipoIdent;
        return this;
    }

    public void setTipoIdent(String tipoIdent) {
        this.tipoIdent = tipoIdent;
    }

    public String getIdentificacionEmpresa() {
        return identificacionEmpresa;
    }

    public Empresa identificacionEmpresa(String identificacionEmpresa) {
        this.identificacionEmpresa = identificacionEmpresa;
        return this;
    }

    public void setIdentificacionEmpresa(String identificacionEmpresa) {
        this.identificacionEmpresa = identificacionEmpresa;
    }

    public String getRazonSocial() {
        return razonSocial;
    }

    public Empresa razonSocial(String razonSocial) {
        this.razonSocial = razonSocial;
        return this;
    }

    public void setRazonSocial(String razonSocial) {
        this.razonSocial = razonSocial;
    }

    public Integer getCelular() {
        return celular;
    }

    public Empresa celular(Integer celular) {
        this.celular = celular;
        return this;
    }

    public void setCelular(Integer celular) {
        this.celular = celular;
    }

    public String getEmail() {
        return email;
    }

    public Empresa email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Proyecto> getProyectos() {
        return proyectos;
    }

    public Empresa proyectos(Set<Proyecto> proyectos) {
        this.proyectos = proyectos;
        return this;
    }

    public Empresa addProyecto(Proyecto proyecto) {
        this.proyectos.add(proyecto);
        proyecto.setEmpresa(this);
        return this;
    }

    public Empresa removeProyecto(Proyecto proyecto) {
        this.proyectos.remove(proyecto);
        proyecto.setEmpresa(null);
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
        if (!(o instanceof Empresa)) {
            return false;
        }
        return id != null && id.equals(((Empresa) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Empresa{" +
            "id=" + getId() +
            ", tipoIdent='" + getTipoIdent() + "'" +
            ", identificacionEmpresa='" + getIdentificacionEmpresa() + "'" +
            ", razonSocial='" + getRazonSocial() + "'" +
            ", celular=" + getCelular() +
            ", email='" + getEmail() + "'" +
            "}";
    }
}
